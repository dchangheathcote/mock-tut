import React from "react";
import ReactDOM from "react-dom/client";
import Button from "./Button";
import RandomDog from "./RandomDog";

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;

    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    const stockClass = product.stocked ? 'in-stock' : 'not-in-stock';

    return (
      <tr>
        <td className={stockClass}>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const { filterText, inStockOnly, products } = this.props;

    const rows = [];
    let lastCategory = null;
    
    //const {products} = this.props;

    //this.props.products.forEach((product) => {
    products.forEach((product) => {
      let productName = product.name;
      if(productName.toLowerCase().indexOf(filterText.toLowerCase())===-1){
        return;
      }
      if(inStockOnly && !product.stocked){
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={productName} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e){
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e){
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    // const filterText = this.props.filterText;
    // const inStockOnly = this.props.inStockOnly;
    
    const {filterText, inStockOnly} = this.props;
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            id="products-in-stock"
            type="checkbox"
            checked={inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          <label htmlFor="products-in-stock">Only show products in stock</label>
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      clickCount: 0
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleFilterTextChange(filterText){
    this.setState({
      filterText:filterText
    })
  }

  handleInStockChange(inStockOnly){
    this.setState({
      inStockOnly:inStockOnly
    })
  }
  handleClick(clickCount){
    this.setState({
      clickCount:clickCount+1
    })
  }
  render() {
    return (
      <div className="main-app" style={{display:'flex', gap:'20px'}}>
        <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        </div>
        <div>
        <p>{this.state.clickCount}</p>
        <Button
          clickCount={this.state.clickCount}
          onHandleClick={this.handleClick}
        />
        <RandomDog/>
        </div>
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Sporting Goods', price: '$19.99', stocked: false, name: 'Baseball Glove'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<FilterableProductTable products={PRODUCTS} />);