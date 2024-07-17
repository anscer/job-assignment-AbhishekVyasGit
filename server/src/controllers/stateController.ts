import { Request, Response } from 'express';
import State from '../models/stateModel';

export const createState = async (req: Request, res: Response) => {
  try {
    const { name, description, status } = req.body;
    
    if (!name || !description || !status) {
      return res.status(400).json({ message: 'Name, description, and status are required' });
    }
    
    const createdBy =  (req.user as { id: string })?.id;
    const newState = new State({ name, description, status, createdBy });
    await newState.save();

    res.status(201).json({ message: 'State created successfully', state: newState });
  } catch (error) {
    console.error('Error creating state:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getStates = async (req: Request, res: Response) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateState = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const updatedState = await State.findByIdAndUpdate(id, { name, description, status, updatedAt: new Date() }, { new: true });
    if (!updatedState) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.status(200).json({ message: 'State updated successfully', state: updatedState });
  } catch (error) {
    console.error('Error updating state:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedState = await State.findByIdAndDelete(id);
    if (!deletedState) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.status(200).json({ message: 'State deleted successfully' });
  } catch (error) {
    console.error('Error deleting state:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
