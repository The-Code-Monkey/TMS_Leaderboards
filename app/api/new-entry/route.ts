import { NextResponse } from 'next/server';

export async function POST(request: Request) {
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

  const result = await fetch(process.env.BASE_URL + '/auth/validate', {
    method: 'POST',
    body: parsedBody.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  opJson = await result.json();

  if (opJson.error) {
    return NextResponse.json({ error: opJson.error }, { status: 403 });
  } else if (opJson.account_id != body.accountId) {
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
    return NextResponse.json(
      { message: 'Record Added Successfully' },
      { status: 200 }
    );
  }
}
