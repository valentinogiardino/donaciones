import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Donation } from "@/interfaces/Donation";
import { toLocalCurrency } from "@/lib/utils";
  
  

  export function TableDonations({donations}: { donations: Donation[]}) {
    
    const totalAmount = donations.reduce((total, donation) => total + donation.amount, 0);
    const renderName = (donation: Donation) => {
      let fullName = ""; // Inicializa la variable para el nombre completo
      
      // Verifica si payerFirstName y payerLastName existen y concatena ambos
      if (donation.payerFirstName && donation.payerLastName) {
        fullName = `${donation.payerFirstName} ${donation.payerLastName}`;
      } else if (donation.payerFirstName) {
        // Si solo existe payerFirstName, asigna solo ese
        fullName = donation.payerFirstName;
      } else if (donation.payerLastName) {
        // Si solo existe payerLastName, asigna solo ese
        fullName = donation.payerLastName;
      } else {
        // Si no existe ninguno, asigna "Anónimo"
        fullName = "Anónimo";
      }
      
      return fullName; // Retorna el nombre completo construido
    }
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Donador</TableHead>
            <TableHead>Mensaje</TableHead>
            <TableHead >Cantidad</TableHead>
            <TableHead >Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map((donation) => (
            <TableRow key={donation.id}>
              <TableCell className="">{renderName(donation)}</TableCell>
              <TableCell className="">{donation.message}</TableCell>
              <TableCell className="font-bold">{toLocalCurrency(donation.amount)}</TableCell>
              <TableCell className="text-sm">{new Date(donation.created_at).toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>{toLocalCurrency(totalAmount)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  