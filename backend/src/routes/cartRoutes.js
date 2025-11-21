import { Router } from 'express';
import { addOrIncrementItem, clearCart, getCart, removeItem, updateItemQuantity } from '../controllers/cartController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', getCart);
router.post('/items', addOrIncrementItem);
router.patch('/items/:productId', updateItemQuantity);
router.delete('/items/:productId', removeItem);
router.delete('/', clearCart);

export default router;
