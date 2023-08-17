import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { FlavorColumn } from "./components/columns";
import { FlavorsClient } from "./components/client";

const FlavorsPage = async ({ params }: { params: { storeId: string } }) => {
  const flavors = await prismadb.flavor.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedFlavor: FlavorColumn[] = flavors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FlavorsClient data={formattedFlavor} />
      </div>
    </div>
  );
};

export default FlavorsPage;
