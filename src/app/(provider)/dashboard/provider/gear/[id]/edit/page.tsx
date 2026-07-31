import ProviderGearForm from "@/app/(provider)/_components/ProviderGearForm";
import { getSingleGearAction } from "@/app/(provider)/_actions/gearActions";
import { notFound } from "next/navigation";

const ProviderEditGearPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await getSingleGearAction(id);

  if (!res?.success || !res?.data) {
    notFound();
  }

  const gear = res.data;

  const initialValues = {
    name: gear.name ?? "",
    description: gear.description ?? "",
    brand: gear.brand ?? "",
    categoryId: gear.categoryId ?? gear.category?.id ?? "",
    pricePerDay: gear.pricePerDay ?? 0,
    stock: gear.stock ?? 1,
    condition: gear.condition ?? "NEW",
    address: gear.address ?? "",
    image: gear.image ?? "",
    availability: gear.availability ?? true,
  };

  return (
    <ProviderGearForm edit={true} gearId={id} initialValues={initialValues} />
  );
};

export default ProviderEditGearPage;
