const express = require('express');

const actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actions.get()
        .then(list => {
            res.status(200).json(list);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'unable to retrieve actions' });
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    actions.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json({ message: 'no action with the specified id was found' });
            } else {
                res.status(200).json(action);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'unable to retrieve action' });
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedAction = req.body;

    if (!updatedAction.description || !updatedAction.notes) {
        res.status(400).json({ message: 'please provide a description and notes for this action'})
    } else {
        actions.update(id, updatedAction)
            .then(updated => {
                if (!updated) {
                    res.status(404).json({ message: 'no action with the specified id was found' });
                } else {
                    res.status(201).json(updated);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: 'unable to update action' });
            })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    actions.remove(id)
        .then(removed => {
            if(!removed) {
                res.status(404).json({ message: 'no action with the specified id was found' });
            } else {
                res.status(200).json(removed);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'unable to remove action' });
        })
})

module.exports = router;