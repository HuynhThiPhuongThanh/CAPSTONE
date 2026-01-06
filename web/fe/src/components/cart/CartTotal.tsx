import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Button from '../Button'


const CartTotal = () => {
  const { cart, total } = useContext(CartContext)
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <Wrapper>
      <div>
        <article>
          <h4>
            Tổng đơn hàng :<span>{total.toLocaleString()} VND</span>
          </h4>
          <hr />
        {isAuthenticated ? (
          <Button handleClick={() => navigate('/checkout')}>
            Tiến hành thanh toán
          </Button>
        ) : (
          <Button handleClick={() => navigate('/login')} >
            Đăng nhập
          </Button>
        )}
        </article>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end; /* Đẩy khung tổng tiền sang phải */
  
  @media (max-width: 992px) {
    justify-content: center; /* Căn giữa trên tablet/mobile */
  }

  article {
    border: 2px solid ${(props) => props.theme.borderColor}; /* Viền tím nhạt */
    border-radius: ${(props) => props.theme.raduis};
    padding: 1.5rem 2rem; /* Giảm padding ngang một chút */
    background-color: ${(props) => props.theme.mainColorLighter}; /* Nền tím rất nhạt */
    width: 350px; /* Định kích thước rõ ràng hơn */
    
    @media (max-width: 768px) {
        width: 100%;
    }
  }
  
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 1fr auto; /* Tên bên trái, giá trị bên phải */
    gap: 1rem;
    font-weight: 500;
    color: ${(props) => props.theme.textColor};
    
    span {
      font-weight: 700;
      color: ${(props) => props.theme.mainColor}; /* Giá trị dùng màu tím chủ đạo */
      text-align: right;
    }
  }

  h4 {
    margin: 1rem 0;
    font-size: 1.25rem;
    color: ${(props) => props.theme.headingColor}; /* Tiêu đề dùng màu tím đậm */
  }
  
  hr {
    border-top: 1px solid ${(props) => props.theme.borderColor};
    margin: 1rem 0;
  }

  /* Button component sẽ tự nhận theme */
  .btn { 
    /* Style này không cần thiết vì bạn dùng <Button> component */
    /* Tuy nhiên nếu Button là div bọc, style này sẽ áp dụng */
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotal
