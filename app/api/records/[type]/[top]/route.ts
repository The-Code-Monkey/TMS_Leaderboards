import supabase from "@/app/supabase";
import {NextResponse} from "next/server";

export async function GET(request: Request, { params }: { params: { top: string, type: string }}) {
    const num = parseInt(params.top, 10);

    const { data, error } = await supabase.from(params.type).select("*").order('ats', { ascending: false }).limit(num ?? 10);

    if (error) {
        return new Response(`Something Went Wrong`, { status: 400 });
    }

    return NextResponse.json(
        { data, },
    { status: 200 }
    )
}