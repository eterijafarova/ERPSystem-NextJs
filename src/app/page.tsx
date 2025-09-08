import Dashboard from "./(dashboard)/dashboard/page";
import Sidebar from "../../components/Sidebar";

export default function HomePage() {
  return (
    <div className="flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
