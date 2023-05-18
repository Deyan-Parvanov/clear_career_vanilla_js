import { get, post, del, put } from "./api.js";

export async function getAllJobs() {
    return get('/data/offers?sortBy=_createdOn%20desc');
}

// export async function getMemesByUser(userId) {
//     return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
// }

export async function getJobById(id) {
    return get('/data/offers/' + id);
}

export async function createJob(job) {
    return post('/data/offers', job);
}

export async function updateJob(id, job) {
    return put('/data/offers/' + id, job)
}

export async function deleteJob(id) {
    return del('/data/offers/' + id);
}