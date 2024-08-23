// routes/songRoutes.ts

import { Router } from 'express';
import { 
        createSong, 
        viewSongs, 
        updateSong, 
        deleteSong 
      } from '../controllers/songController';

const router = Router();

router.post('/addsong', createSong);
router.get('/viewsongs', viewSongs);
router.put('/updatesong/:id', updateSong);
router.delete('/songs/:id', deleteSong);

export default router;
