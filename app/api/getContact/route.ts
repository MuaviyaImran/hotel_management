import dbConnect from "@/backend/config/dbConnect";
import { getAllContactDetails } from "@/backend/controllers/ContactFormController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext { }

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getAllContactDetails);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<Response>;
}
