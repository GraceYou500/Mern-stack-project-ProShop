import React, { useEffect } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  console.log('cart screen', location);

  const qty = Number(searchParams.get('qty'));
  const productId = searchParams.get('productId');

  console.log('qty, productId', qty, productId);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log('cart', cart, cartItems);
  console.log('cartItems', cartItems);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }

    // if (!userInfo) {
    //   navigate('/');
    // }

  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    console.log('checkout');
    navigate('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((el) => (
              <ListGroup.Item key={el.product}>
                <Row>
                  <Col md={2}>
                    <Image src={el.image} alt={el.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${el.product}`}>{el.name}</Link>
                  </Col>
                  <Col md={2}>${el.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={el.qty}
                      onChange={(e) =>
                        dispatch(addToCart(el.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(el.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(el.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, el) => acc + el.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, el) => acc + el.qty * el.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
