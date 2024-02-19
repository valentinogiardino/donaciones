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
              <TableCell className="">{donation.payerName ?? "Anónimo"}</TableCell>
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
  