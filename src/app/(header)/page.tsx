import { TableDonations } from "@/components/TableDonations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { donate, getDonations } from "../../lib/actions";
import NotificationComponent from "@/components/NotificationComponent";

export const revalidate = 0

export default async function HomePage() {

  const donations = await getDonations();

  return (
    <section>
      <section className="grid gap-12">
        <form action={donate} className="grid gap-8 border p-8">
          <p className="text-center font-bold font-serif text-lg">Puedes colaborar con <span className="text-orange-600">Valentino Giardino</span> donándole dinero</p>
          <Label className="grid gap-2">
            <span>Valor</span>
            <Input type="number" name="amount"/>
          </Label>
          <Label className="grid gap-2">
            <span>Tu mensaje en la donación</span>
            <Textarea name="message"/>
          </Label>
          <Button type="submit">Enviar</Button>
        </form>
        <TableDonations donations={donations}/>
      </section>
    <NotificationComponent />
    </section>
    
  );
}
