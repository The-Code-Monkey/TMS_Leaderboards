import { NextResponse } from 'next/server';
import PlayerModel from './PlayerModel';

const revalidate = 1;

export async function POST(request: Request) {
  let ip = '127.0.0.1';

  const body = await request.json();
  const requiredBodyParams = [
    'token',
    'accountId',
    'displayName',
    'pluginVersion',
  ];
  requiredBodyParams.forEach((param) => {
    if (!body[param])
      return new Response(`Missing body parameter: ${param}`, { status: 404 });
  });
  let opJson;

  let parsedBody = new URLSearchParams();
  parsedBody.set('token', body.token);
  parsedBody.set('secret', process.env.SECRET);

  if (process.env.DEV === 'true') {
    opJson = {
      account_id: body.accountId,
      display_name: body.displayName,
      token_time: new Date().getTime() / 1000,
    };
  } else {
    const result = await fetch(process.env.BASE_URL + '/auth/validate', {
      method: 'POST',
      body: parsedBody.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    opJson = await result.json();
  }

  if (opJson.error) {
    return NextResponse.json({ error: opJson.error }, { status: 403 });
  } else if (opJson.account_id !== body.accountId) {
    return NextResponse.json(
      {
        error:
          'Account ID for ' +
          body.displayName +
          ' is not the same as the one returned by the server',
      },
      { status: 502 }
    );
  } else {
    let playerRes = new PlayerModel();

    playerRes = await playerRes.login;

    playerRes.setAccountId = opJson.account_id;

    playerRes = await playerRes.getPlayerByAccountId;

    if (!playerRes.exists) {
      console.log('Player Not Found:', opJson);
      playerRes.setPlayerInDB = {
        accountId: opJson.account_id,
        displayName: opJson.display_name,
        lastLogin: new Date(opJson.token_time * 1000)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
        lastPluginVersion: body.pluginVersion,
        lastToken: body.token,
        lastIpAddress: ip,
      };
    } else {
      console.log('Player Found:', playerRes.getDisplayName);
    }

    setTimeout(() => {
      console.log('Found Or Created:', playerRes.getDisplayName);

      return NextResponse.json(
        { message: 'Record Added Successfully' },
        { status: 200 }
      );
    }, 2000);
  }
}
