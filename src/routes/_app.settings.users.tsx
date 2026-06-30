import { createFileRoute } from "@tanstack/react-router";
import { USERS_DATA } from "@/lib/mockData";
import { Card, CardHeader, CardBody, PageTitle, Btn } from "@/components/ui-bits";
import { StatusBadge } from "@/components/NetworkMap";

export const Route = createFileRoute("/_app/settings/users")({ component: Page });

function Page() {
  return (
    <div>
      <PageTitle title="Users & Roles" subtitle="Manage access for Supply Chain Head, Plant Operations, and Warehouse Manager roles"
        actions={<Btn variant="teal" size="sm">+ Invite user</Btn>}
      />
      <Card>
        <CardBody className="p-0">
          <table className="w-full text-[12.5px]">
            <thead className="bg-panel text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Email</th><th className="px-3 py-2 text-left">Role</th><th className="px-3 py-2 text-left">Status</th><th className="px-3 py-2 text-left">Last login</th><th></th></tr>
            </thead>
            <tbody>
              {USERS_DATA.map((u) => (
                <tr key={u.email} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{u.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{u.email}</td>
                  <td className="px-3 py-2">{u.role}</td>
                  <td className="px-3 py-2"><StatusBadge status={u.status === "Active" ? "healthy" : "neutral"}>{u.status}</StatusBadge></td>
                  <td className="px-3 py-2 text-muted-foreground">{u.lastLogin}</td>
                  <td className="px-3 py-2 text-right"><Btn size="sm" variant="outline">Edit</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
