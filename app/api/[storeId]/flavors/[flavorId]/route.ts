import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { flavorId: string } }
) {
  try {
    if (!params.flavorId) {
      return new NextResponse("Flavor id is required", { status: 400 });
    }

    const flavor = await prismadb.flavor.findUnique({
      where: {
        id: params.flavorId,
      },
    });

    return NextResponse.json(flavor);
  } catch (error) {
    console.log("[FLAVOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { flavorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.flavorId) {
      return new NextResponse("Flavor id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const flavor = await prismadb.flavor.delete({
      where: {
        id: params.flavorId,
      },
    });

    return NextResponse.json(flavor);
  } catch (error) {
    console.log("[FLAVOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { flavorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.flavorId) {
      return new NextResponse("Flavor id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const flavor = await prismadb.flavor.update({
      where: {
        id: params.flavorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(flavor);
  } catch (error) {
    console.log("[FLAVOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
