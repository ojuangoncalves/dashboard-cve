import { getHeaders } from "@/utils/util";
import HomePage from "@/components/HomePage";

export default async function Home() {
  const headers = await getHeaders();

  return (
    <HomePage headers={headers} />
  );
}
