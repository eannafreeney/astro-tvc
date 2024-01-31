<script>
import AddPrinterForm from "./AddPrinterForm.svelte";
import PrinterTable from "./PrinterTable.svelte";
import QuoteForm from "./QuoteForm.svelte";
import QuotesTable from "./QuotesTable.svelte";
import Modal from './Modal.svelte'

export let printers
export let submissions

let showModal = false;

function openModal() {
     showModal = true
    }


</script>

<h1>Add a New Printer</h1>
<AddPrinterForm client:load />
<h1>All Printers</h1>
<PrinterTable client:load printers={printers} />
<h1>Get a Quote</h1>
<QuoteForm client:load printers={printers} />
<h1>All Submissions</h1>
<QuotesTable submissions={submissions} openModal={openModal} />


<Modal bind:showModal>
	<p>This is the modal</p>
</Modal>