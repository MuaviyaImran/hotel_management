import dbConnect from "@/backend/config/dbConnect";
import { newContactForm } from "@/backend/controllers/ContactFormController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext { }

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(newContactForm);

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<Response>;
}
