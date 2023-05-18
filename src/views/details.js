import { deleteJob, getJobById } from "../api/jobs.js";
import { html } from "../libs.js";
import { getUserData } from "../utility.js";

const detailsTemplate = (job, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
    <img id="details-img" src="${job.imageUrl}" alt="${job.imageUrl}" />
    <p id="details-title">${job.title}</p>
    <p id="details-category">
        Category: <span id="categories">${job.category}</span>
    </p>
    <p id="details-salary">
        Salary: <span id="salary-number">${job.salary}</span>
    </p>
    <div id="info-wrapper">
        <div id="details-description">
        <h4>Description</h4>
        <span>${job.description}</span>
        </div>
        <div id="details-requirements">
        <h4>Requirements</h4>
        <span>${job.requirements}</span>
        </div>
    </div>
    <p>Applications: <strong id="applications">1</strong></p>

    <div id="action-buttons">

        ${isOwner ? html`
        <a href="/edit/${job._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} id="delete-btn">Delete</a>`
        : ''}

        <a href="" id="apply-btn">Apply</a>
    </div>
    </div>
</section>`;

export async function detailsView(ctx) {
    const job = await getJobById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData?.id == job._ownerId;
    ctx.render(detailsTemplate(job, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this offer?')

        if (choice) {
            await deleteJob(ctx.params.id);
            ctx.page.redirect('/dashboard')
        }
    }
}