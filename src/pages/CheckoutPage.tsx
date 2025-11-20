import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import QrCodeIcon from '@mui/icons-material/QrCode';
import StoreIcon from '@mui/icons-material/Store';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from 'react-router-dom';

// Tipos locales
interface ShippingData {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  notes: string;
}

const CheckoutPage: React.FC = () => {
  const { state, clearCart } = useCart();
  const { user, createOrderFromCart } = useUser();
  const navigate = useNavigate();

  const [step, setStep] = useState<'shipping' | 'payment' | 'review' | 'done'>('shipping');
  const [shipping, setShipping] = useState<ShippingData>({
    fullName: `${user.firstName} ${user.lastName}`.trim() || '',
    address: user.address || '',
    city: '',
    postalCode: '',
    phone: user.phone || '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'store' | 'qr' | ''>('');
  const [cardData, setCardData] = useState({ holder: '', number: '', exp: '', cvv: '' });
  const [orderId, setOrderId] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  // Redirigir si carrito vacío
  useEffect(() => {
    if (state.items.length === 0 && step !== 'done') {
      navigate('/cart');
    }
  }, [state.items.length, step, navigate]);

  const shippingCost = state.total > 1000 ? 0 : 99;
  const finalTotal = state.total + shippingCost;

  const canContinueShipping = shipping.fullName && shipping.address && shipping.city && shipping.postalCode;
  const canContinuePayment = paymentMethod !== '' && (paymentMethod !== 'card' || (cardData.holder && cardData.number && cardData.exp && cardData.cvv));

  const goBack = () => {
    if (step === 'shipping') navigate('/cart');
    else if (step === 'payment') setStep('shipping');
    else if (step === 'review') setStep('payment');
  };

  const confirmOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      const newOrderId = createOrderFromCart(state.items, shippingCost);
      clearCart();
      setOrderId(newOrderId);
      setProcessing(false);
      setStep('done');
    }, 1000); // simulación
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Steps */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex flex-wrap gap-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-semibold ${step === 'shipping' ? 'bg-gradient-to-r from-red-500 to-[#B974F4] text-white border-transparent shadow-md' : 'bg-white text-gray-700 border-gray-200'}`}>
              <LocalShippingIcon fontSize="small" /> <span>Envío</span>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-semibold ${step === 'payment' ? 'bg-gradient-to-r from-red-500 to-[#B974F4] text-white border-transparent shadow-md' : 'bg-white text-gray-700 border-gray-200'}`}>
              <PaymentIcon fontSize="small" /> <span>Pago</span>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-semibold ${step === 'review' ? 'bg-gradient-to-r from-red-500 to-[#B974F4] text-white border-transparent shadow-md' : 'bg-white text-gray-700 border-gray-200'}`}>
              <DoneAllIcon fontSize="small" /> <span>Revisión</span>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-semibold ${step === 'done' ? 'bg-gradient-to-r from-red-500 to-[#B974F4] text-white border-transparent shadow-md' : 'bg-white text-gray-700 border-gray-200'}`}>
              <CheckCircleIcon fontSize="small" /> <span>Confirmación</span>
            </div>
          </div>
        </div>

        {step !== 'done' && (
          <button onClick={goBack} className="mb-6 inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowBackIcon fontSize="small" /> <span>Regresar</span>
          </button>
        )}

        {step === 'shipping' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center space-x-2"><LocalShippingIcon className="text-[#B974F4]" /><span>Datos de Envío</span></h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input value={shipping.fullName} onChange={e => setShipping(s => ({ ...s, fullName: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B974F4] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input value={shipping.phone} onChange={e => setShipping(s => ({ ...s, phone: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B974F4] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B974F4] outline-none" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                  <input value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B974F4] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                  <input value={shipping.postalCode} onChange={e => setShipping(s => ({ ...s, postalCode: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B974F4] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                  <input value={shipping.notes} onChange={e => setShipping(s => ({ ...s, notes: e.target.value }))} placeholder="Referencias, horario, etc." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B974F4] outline-none" />
                </div>
              </div>
              <div className="flex justify-end">
                <button disabled={!canContinueShipping} onClick={() => setStep('payment')} className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition">
                  <PaymentIcon fontSize="small" /> <span>Continuar a Pago</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2"><ShoppingCartIcon className="text-[#B974F4]" /><span>Resumen</span></h3>
              <div className="space-y-3 mb-4">
                {state.items.map(i => (
                  <div key={i.id} className="flex items-center justify-between text-sm">
                    <span className="truncate max-w-[160px]" title={i.name}>{i.name} x{i.quantity}</span>
                    <span className="font-semibold">${(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>${state.total.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Envío</span><span className={shippingCost === 0 ? 'text-green-600' : ''}>{shippingCost === 0 ? 'GRATIS' : `$${shippingCost}`}</span></div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900"><span>Total</span><span>${finalTotal.toLocaleString()}</span></div>
              </div>
              <p className="mt-4 text-xs text-gray-500 flex items-center"><LockIcon fontSize="small" className="mr-1" /> Tus datos están protegidos.</p>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2"><PaymentIcon className="text-[#B974F4]" /><span>Método de Pago</span></h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button onClick={() => setPaymentMethod('card')} className={`p-4 rounded-xl border flex items-center space-x-3 transition ${paymentMethod==='card' ? 'border-[#B974F4] bg-[#B974F4]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <CreditCardIcon className="text-[#B974F4]" /><span className="text-sm font-semibold">Tarjeta</span>
                  </button>
                  <button onClick={() => setPaymentMethod('transfer')} className={`p-4 rounded-xl border flex items-center space-x-3 transition ${paymentMethod==='transfer' ? 'border-[#B974F4] bg-[#B974F4]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <PaymentIcon className="text-[#B974F4]" /><span className="text-sm font-semibold">Transferencia</span>
                  </button>
                  <button onClick={() => setPaymentMethod('store')} className={`p-4 rounded-xl border flex items-center space-x-3 transition ${paymentMethod==='store' ? 'border-[#B974F4] bg-[#B974F4]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <StoreIcon className="text-[#B974F4]" /><span className="text-sm font-semibold">Pago en tienda</span>
                  </button>
                  <button onClick={() => setPaymentMethod('qr')} className={`p-4 rounded-xl border flex items-center space-x-3 transition ${paymentMethod==='qr' ? 'border-[#B974F4] bg-[#B974F4]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <QrCodeIcon className="text-[#B974F4]" /><span className="text-sm font-semibold">QR / SPEI</span>
                  </button>
                </div>
                {paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titular</label>
                      <input value={cardData.holder} onChange={e => setCardData(d => ({ ...d, holder: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B974F4] outline-none" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Número</label>
                        <input value={cardData.number} onChange={e => setCardData(d => ({ ...d, number: e.target.value }))} maxLength={19} placeholder="XXXX XXXX XXXX XXXX" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B974F4] outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiración</label>
                        <input value={cardData.exp} onChange={e => setCardData(d => ({ ...d, exp: e.target.value }))} placeholder="MM/AA" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B974F4] outline-none" />
                      </div>
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input value={cardData.cvv} onChange={e => setCardData(d => ({ ...d, cvv: e.target.value }))} maxLength={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B974F4] outline-none" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button disabled={!canContinuePayment} onClick={() => setStep('review')} className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition">
                  <DoneAllIcon fontSize="small" /> <span>Revisar Pedido</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2"><ShoppingCartIcon className="text-[#B974F4]" /><span>Resumen</span></h3>
              <div className="space-y-3 mb-4">
                {state.items.map(i => (
                  <div key={i.id} className="flex items-center justify-between text-sm">
                    <span className="truncate max-w-[160px]" title={i.name}>{i.name} x{i.quantity}</span>
                    <span className="font-semibold">${(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>${state.total.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Envío</span><span className={shippingCost === 0 ? 'text-green-600' : ''}>{shippingCost === 0 ? 'GRATIS' : `$${shippingCost}`}</span></div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900"><span>Total</span><span>${finalTotal.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2"><DoneAllIcon className="text-[#B974F4]" /><span>Revisión Final</span></h2>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Productos</h4>
                    <div className="space-y-2">
                      {state.items.map(i => (
                        <div key={i.id} className="flex justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                          <span className="truncate max-w-[200px]" title={i.name}>{i.name} x{i.quantity}</span>
                          <span className="font-semibold">${(i.price * i.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Envío</h4>
                    <p className="text-sm text-gray-600">{shipping.fullName}, {shipping.address}, {shipping.city}, CP {shipping.postalCode}</p>
                    {shipping.notes && <p className="text-xs text-gray-500 mt-1">Notas: {shipping.notes}</p>}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Pago</h4>
                    <p className="text-sm text-gray-600">{paymentMethod === 'card' ? `Tarjeta terminada en ${cardData.number.slice(-4)}` : paymentMethod === 'transfer' ? 'Transferencia Bancaria (instrucciones por correo)' : paymentMethod === 'store' ? 'Pago en tienda (reservado 24h)' : 'QR / SPEI (código generado)'}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-gray-900">
                    <span>Total a pagar</span>
                    <span>${finalTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={confirmOrder} disabled={processing} className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-40 disabled:cursor-not-allowed">
                      <CheckCircleIcon fontSize="small" /> <span>{processing ? 'Procesando...' : 'Confirmar Pedido'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2"><ShoppingCartIcon className="text-[#B974F4]" /><span>Resumen</span></h3>
              <div className="space-y-3 mb-4">
                {state.items.map(i => (
                  <div key={i.id} className="flex items-center justify-between text-sm">
                    <span className="truncate max-w-[160px]" title={i.name}>{i.name} x{i.quantity}</span>
                    <span className="font-semibold">${(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>${state.total.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Envío</span><span className={shippingCost === 0 ? 'text-green-600' : ''}>{shippingCost === 0 ? 'GRATIS' : `$${shippingCost}`}</span></div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900"><span>Total</span><span>${finalTotal.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">
              <CheckCircleIcon className="text-green-500 mb-4" style={{ fontSize: '64px' }} />
              <h2 className="text-3xl font-bold text-gray-900 mb-3">¡Pedido Confirmado!</h2>
              <p className="text-gray-600 mb-6">Tu orden <span className="font-semibold">#{orderId.split('-')[0]}</span> ha sido registrada correctamente. Te enviaremos un correo con los detalles y el seguimiento.</p>
              <div className="space-y-3">
                <button onClick={() => navigate('/profile')} className="w-full bg-gradient-to-r from-red-500 to-[#B974F4] text-white py-3 px-4 rounded-xl font-semibold hover:scale-105 transition">
                  Ver mis Órdenes
                </button>
                <button onClick={() => navigate('/catalog')} className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition border border-gray-200">
                  Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
