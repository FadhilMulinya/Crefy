import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get("content-type");

        if (contentType?.startsWith("multipart/form-data")) {
            // Handle file upload
            const data = await request.formData();
            const file: File | null = data.get("file") as unknown as File;

            if (!file) {
                return NextResponse.json(
                    { error: "No file provided" },
                    { status: 400 }
                );
            }

            const uploadData = await pinata.upload.file(file);
            const url = await pinata.gateways.convert(uploadData.IpfsHash);
            return NextResponse.json(url, { status: 200 });
        } else if (contentType?.startsWith("application/json")) {
            // Handle JSON upload
            const jsonData = await request.json();
            const uploadData = await pinata.upload.json(jsonData);
            const url = await pinata.gateways.convert(uploadData.IpfsHash);
            return NextResponse.json(url, { status: 200 });
        } else {
            return NextResponse.json(
                { error: "Unsupported content type" },
                { status: 400 }
            );
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const ipfsUrl = request.nextUrl.searchParams.get("ipfsUrl");
    if (!ipfsUrl) {
        return NextResponse.json(
            { error: "Missing ipfsUrl parameter" },
            { status: 400 }
        );
    }
    const { data } = await pinata.gateways.get(ipfsUrl);
    console.log(data);
    return NextResponse.json(data, { status: 200 });
}