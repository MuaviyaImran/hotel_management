import dbConnect from "@/backend/config/dbConnect";
import { editBooking } from "@/backend/controllers/bookingController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext { }

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.put(editBooking);
export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<Response>;
}
