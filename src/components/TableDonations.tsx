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
  
  

  export function TableDonations({donations}: { donations: Donation[]}) {
    
    const totalAmount = donations.reduce((total, donation) => total + donation.amount, 0);

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mensaje</TableHead>
            <TableHead >Fecha</TableHead>
            <TableHead >Cantidad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map((donation) => (
            <TableRow key={donation.id}>
              <TableCell className="">{donation.message}</TableCell>
              <TableCell >{new Date(donation.created_at).toLocaleString()}</TableCell>
              <TableCell className="font-bold">{donation.amount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>{totalAmount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  