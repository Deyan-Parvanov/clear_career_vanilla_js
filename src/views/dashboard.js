import { getAllJobs } from "../api/jobs.js";
import { html } from "../libs.js";

const catalogTemplate = (jobs) => html`
<section id="dashboard">
    <h2>Job Offers</h2>
    <div class="offer">
        ${jobs.length == 0 ? html`<h2>No offers yet.</h2>` : jobs.map(jobCard)}

    </div>
</section>
`;

const jobCard = (job) => html`
    <img src="${job.imageUrl}" alt="${job.imageUrl}" />
    <p>
        <strong>Title: </strong><span class="title">${job.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${job.salary}</span></p>
    <a class="details-btn" href="/details/${job._id}">Details</a>
`

export async function catalogView(ctx) {
    const jobs = await getAllJobs();
    ctx.render(catalogTemplate(jobs));
}