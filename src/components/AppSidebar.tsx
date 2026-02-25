
import { Building2, Home, Users, CreditCard, FileText, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Asociados",
    url: "/asociados",
    icon: Users,
  },
  {
    title: "Cuotas",
    url: "/cuotas",
    icon: CreditCard,
  },
  {
    title: "Pagos",
    url: "/pagos",
    icon: FileText,
  },
  {
    title: "Reportes",
    url: "/reportes",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full">
            <img
          src="/lovable-uploads/802f1823-b376-40ea-b87b-309982d8066b.png"
          alt="CCRAW logo"
          className="h-10 w-10 rounded-full object-contain mr-2"
          style={{ background: "#fff" }}
        />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Cámara de</h2>
            <p className="text-base font-semibold text-gray-900">Comercio Rawson</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Gestión
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link 
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        location.pathname === item.url
                          ? 'bg-ccr-blue text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-center text-xs text-gray-500">
          <p>© 2025 C.C. Rawson</p>
          <p>Versión 1.0</p>
          <p>Desarrollado por</p>
          <a
            href="https://www.horacioabitu.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors underline"
          >
            Horacio Abitú
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
