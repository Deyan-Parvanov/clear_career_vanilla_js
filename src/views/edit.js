import { getJobById, updateJob } from "../api/jobs.js";
import { html } from "../libs.js";

const editTemplate = (job, onSubmit) => html`
<section id="edit">
    <div class="form">
    <h2>Edit Offer</h2>
    <form @submit=${onSubmit} class="edit-form">
        <input
        type="text"
        name="title" .value=${job.title}
        id="job-title"
        placeholder="Title"
        />
        <input
        type="text"
        name="imageUrl" .value=${job.imageUrl}
        id="job-logo"
        placeholder="Company logo url"
        />
        <input
        type="text"
        name="category" .value=${job.category}
        id="job-category"
        placeholder="Category"
        />
        <textarea
        id="job-description"
        name="description" .value=${job.description}
        placeholder="Description"
        rows="4"
        cols="50"
        ></textarea>
        <textarea
        id="job-requirements"
        name="requirements" .value=${job.requirements}
        placeholder="Requirements"
        rows="4"
        cols="50"
        ></textarea>
        <input
        type="text"
        name="salary" .value=${job.salary}
        id="job-salary"
        placeholder="Salary"
        />

        <button type="submit">post</button>
    </form>
    </div>
</section>`;

export async function editView(ctx) {
    const job = await getJobById(ctx.params.id)
    ctx.render(editTemplate(job, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const job = {
            title: formData.get('title'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            requirements: formData.get('requirements'),
            salary: formData.get('salary')
        }

        if (job.title == '' || job.imageUrl == '' || job.category == '' || job.description == '' || job.requirements == '' || job.salary == '') {
            return alert('All fields are required!')
        }

        await updateJob(ctx.params.id, job);
        event.target.reset();
        ctx.page.redirect('/details/' + ctx.params.id);
    } 
}