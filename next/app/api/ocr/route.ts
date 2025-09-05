import { NextRequest } from "next/server";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const client = new LambdaClient({ region: process.env.AWS_REGION });

export async function POST(req: NextRequest) {
  try {
    const { pdf_base64 } = await req.json();
    if (!pdf_base64) return new Response("No PDF provided", { status: 400 });

    const command = new InvokeCommand({
      FunctionName: "ocrLambda",
      Payload: Buffer.from(JSON.stringify({ pdf_base64 })),
    });

    const result = await client.send(command);

    if (!result.Payload) throw new Error("No payload from Lambda");

    // Parse Lambda response
    const payloadText = new TextDecoder().decode(result.Payload);
    const lambdaData = JSON.parse(payloadText);

    // Lambda already returns base64-encoded PDF
    let base64Pdf = lambdaData.body;
    if (!base64Pdf) throw new Error("No PDF body from Lambda");

    // Remove extra quotes if Lambda returns JSON-encoded string
    if (base64Pdf.startsWith('"') && base64Pdf.endsWith('"')) {
      base64Pdf = JSON.parse(base64Pdf);
    }

    // Convert base64 to Uint8Array
    const pdfBytes = Uint8Array.from(Buffer.from(base64Pdf, "base64"));

    // Return PDF as raw bytes
    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="ocr_output.pdf"',
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Lambda invocation failed", { status: 500 });
  }
}
