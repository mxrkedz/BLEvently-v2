import {
  Transaction,
  PublicKey,
  SystemProgram,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import { NextRequest, NextResponse } from "next/server";
import { getCompletedAction } from "@/app/helper";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const GET = async (req: NextRequest) => {
  const payload: ActionGetResponse = {
    type: "action",
    title: "Event Name",
    icon: "https://i.imgur.com/wKY2gEc.jpeg",
    description: "Event Description",
    label: "",
    links: {
      actions: [
        {
          href: "/api/actions",
          label: "Attend - Free",
          parameters: [
            {
              name: "name",
              label: "Your name",
              type: "text",
              required: true,
            },
            {
              name: "email",
              label: "Your email",
              type: "email",
              required: true,
            },
            {
              name: "tosAgreement",
              type: "checkbox",
              required: true,
              options: [
                {
                  label:
                    "By clicking 'Attending' you are agreeing to our terms of service and privacy policy ",
                  value: "true",
                },
              ],
            },
          ],
        },
      ],
    },
  };

  return NextResponse.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { account: string; signature: string };

    const sender = new PublicKey(body.account);
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: new PublicKey("JC7fd4qSmXmynBt1J8og36z4sfwNwouL1GMFPD5nyCSS"),
        lamports: LAMPORTS_PER_SOL * 0,
      })
    );
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = sender;

    return NextResponse.json(
      await createPostResponse({
        fields: {
          type: "transaction",
          links: {
            next: getCompletedAction(),
          },
          transaction: tx,
          message: `Action completed`,
        },
      }),
      {
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
