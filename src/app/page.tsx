import Caurosel from "@/components/Caurosel";
import { getHeaders } from "@/utils/util";
import Header from "@/components/Header";
import StatusDashboard from "@/components/StatusDashboard";

export default async function Home() {
  const headers = await getHeaders();

  return (
    <>
      <header className="">
        <Header title="Monitoramento CVE" />
      </header>
      <div className="flex items-center justify-between w-full p-20 text-white transition-shadow duration-300 rounded-lg shadow-xl hover:shadow-2xl">
        <StatusDashboard title="Disponível" value="10" color="bg-green-500" />
        <StatusDashboard title="Offline" value="2" color="bg-red-500" />
        <StatusDashboard title="Ocupado" value="15" color="bg-yellow-500" />
        <StatusDashboard title="Manutenção" value="0" color="bg-[#878787]" />
      </div>
      <Caurosel headers={headers} />
    </>
  );
}
