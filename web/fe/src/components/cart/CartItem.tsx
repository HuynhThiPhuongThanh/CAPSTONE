import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ id, image, title, price, quantity }) => {

  const { removeItem } = useContext(CartContext)

  return (
    <Wrapper className='row'>
      <div className="title col-md-3 col-4 ">
        <img src={image} alt={title} /> <br className='d-block d-md-none' />
        <div style={{ width: '200px' }}>
          <h5 className="name">{title}</h5>
            <h5 className="price d-block d-md-none">{price.toLocaleString()} VND</h5>
        </div>
      </div>
        <h5 className="price d-none d-md-block col">{price.toLocaleString()} VND</h5>
      <div className="amount d-none d-md-block col">
        <h5 className="quantity ms-4">{quantity}</h5>
      </div>
        <h5 className="subtotal col-4 col-md">{(price * quantity).toLocaleString()} VND</h5>
      <button className="remove-btn col-4 col-md" onClick={() => removeItem(id)}>
        <FontAwesomeIcon className='text-danger' icon={faTrash} />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  /* Sử dụng flex/grid của Bootstrap (className='row') */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.mainColorLighter}; /* Viền tím rất nhạt */

  /* Tiêu đề & Ảnh sản phẩm */
  .title {
    display: flex; 
    align-items: center;
    gap: 1rem;
    text-align: left;
  }

  /* Ảnh sản phẩm */
  img {
    width: 75px; 
    height: 75px;
    display: block;
    border-radius: ${(props) => props.theme.raduis};
    object-fit: cover;
    border: 1px solid ${(props) => props.theme.borderColor}; /* Thêm viền nhẹ */
  }

  h5 {
    font-size: 1rem;
    margin-bottom: 0;
    font-weight: 500;
  }

  /* Tên sản phẩm */
  .name {
    color: ${(props) => props.theme.headingColor}; /* Tên dùng màu tím đậm */
    font-weight: 600;
  }

  /* Giá đơn vị (dùng màu tím nhạt) */
  .price {
    width: 100%;
    color: ${(props) => props.theme.mainColorLight}; /* Tím nhạt */
    font-size: 0.95rem;
    margin-top: 0.25rem;
  }

  /* Số lượng */
  .amount {
    display: flex;
    align-items: center;
    justify-content: center; /* Căn giữa */

    .quantity {
      font-size: 1rem;
      font-weight: 600;
      color: ${(props) => props.theme.textColor};
    }
  }

  /* Thành tiền */
  .subtotal {
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.mainColor}; /* Màu tím chủ đạo */
    text-align: right;

    @media (max-width: 768px) {
      font-size: 0.9rem; /* Nhỏ hơn trên mobile */
    }
  }

  /* Nút xóa */
  .remove-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: auto;
    height: auto;
    font-size: 1rem;
    
    /* Icon thùng rác */
    .text-danger {
        color: #dc3545 !important; /* Giữ màu đỏ tiêu chuẩn cho xóa */
        transition: ${(props) => props.theme.transition};
    }

    &:hover .text-danger {
        transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
        text-align: left;
    }
  }
`;

export default CartItem;