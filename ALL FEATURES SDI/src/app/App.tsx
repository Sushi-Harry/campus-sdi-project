import { useState } from "react";
import { TopNav } from "./components/top-nav";
import { Sidebar } from "./components/sidebar";
import { DigitalTwinPage } from "./pages/digital-twin-page";
import { EnergyPage } from "./pages/energy-page";
import { WaterPage } from "./pages/water-page";
import { WastePage } from "./pages/waste-page";
import { CarbonPage } from "./pages/carbon-page";
import { SDGImpactPage } from "./pages/sdg-impact-page";

export type PageType = "Digital Twin" | "Energy" | "Water" | "Waste" | "Carbon" | "SDG Impact";

export default function App() {
  const [activePage, setActivePage] = useState<PageType>("Digital Twin");

  const renderPage = () => {
    switch (activePage) {
      case "Digital Twin":
        return <DigitalTwinPage />;
      case "Energy":
        return <EnergyPage />;
      case "Water":
        return <WaterPage />;
      case "Waste":
        return <WastePage />;
      case "Carbon":
        return <CarbonPage />;
      case "SDG Impact":
        return <SDGImpactPage />;
      default:
        return <DigitalTwinPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <div className="flex">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-[1600px] mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}