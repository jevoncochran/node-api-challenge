const express = require('express');

const projects = require('../data/helpers/projectModel');
const actions = require('../data/helpers/actionModel');

const router = express.Router();

router.post('/', (req, res) => {
    const newProject = req.body;

    if (!newProject.name || !newProject.description) {
        res.status(400).json({ message: 'please provide a name and a description for this project' });
    } else {
        projects.insert(newProject)
            .then(project => {
                res.status(201).json(project);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'unable to add project' });
            })
    } 
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    projects.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json({ message: 'project with the specified id not found' });
            } else {
                res.status(200).json(project);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'unable to retrive project' });
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;

    if (!updatedProject.name || !updatedProject.description) {
        res.status(400).json({ message: 'please provide a name and a description for this project'});
    } else {
        projects.update(id, updatedProject)
            .then(project => {
                if (!project) {
                    res.status(404).json({ message: 'project with the specified id not found' });
                } else {
                    res.status(201).json(project);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: 'unable to update project' });
            })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    projects.remove(id)
        .then(removed => {
            if (!removed) {
                res.status(404).json({ message: 'project with the specified id not found' });
            } else {
                res.status(200).json(removed);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'unable to remove project' });
        })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;

    projects.getProjectActions(id)
        .then(project => {
            if (!project) {
                res.status(404).json({ message: 'project with the specified id not found' });
            } else {
                res.status(200).json(project);
            }
        })
})

router.post('/:id/actions', (req, res) => {
    const { id } = req.params;
    const newAction = req.body;

    if (!newAction.description || !newAction.notes) {
        res.status(400).json({ message: 'please provide a description and notes for this action' });
    } else {
        actions.insert({...newAction, project_id: id})
            .then(({project_id}) => {
                projects.get(project_id)
                    .then(project => {
                        if (!project) {
                            res.status(400).json({ message: 'project with the specified id not found'})
                        } else {
                            res.status(201).json(project);
                        }
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: 'unable to add action' });
            })
    }
})

module.exports = router;