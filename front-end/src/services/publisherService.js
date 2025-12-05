import api from './api';

export const publisherService = {
    // Get all publishers
    getAllPublishers() {
        return api.get('/library/publishers');
    },

    // Create new publisher (admin only)
    createPublisher(publisherData) {
        return api.post('/library/publishers', publisherData);
    },

    // Update publisher (admin only)
    updatePublisher(id, publisherData) {
        return api.put(`/library/publishers/${id}`, publisherData);
    },

    // Delete publisher (admin only)
    deletePublisher(id) {
        return api.delete(`/library/publishers/${id}`);
    }
};
