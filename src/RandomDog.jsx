import React, { Component } from 'react';

class DogImage extends Component {
    render() { 
        return (
            <img src={this.props.url} alt="" style={{width:'200px', height:'auto'}}/>
        );
    }
}

class DogVideo extends Component {
    render() { 
        return (
            <video controls autoPlay loop width='250px'>
                <source src={this.props.url}/>
            </video>
        );
    }
}
 
class RandomDog extends Component {
    constructor(props){
        super(props);
        this.state = {
            dogImages: '',
            dogCount:0,
            imgCount:0,
            vidCount:0
        }
    }
    render() { 
        const dogAPI = 'https://random.dog/woof.json';
        const updateDogImage = (data) => {
            let ext = data.url.split('.');
            ext = ext[ext.length-1].toLowerCase();
            if(ext==='mp4' || ext==='webm'){
                this.setState({
                    dogImages: <DogVideo url={data.url} />,
                    dogCount: this.state.dogCount+1,
                    vidCount: this.state.vidCount +1
                });
                return;
            }
            this.setState({
                dogImages: <DogImage url={data.url}/>,
                dogCount: this.state.dogCount+1,
                imgCount: this.state.imgCount+1
            });
        }
    
        const onGetRandomDogImg = () =>{
            this.setState({
                dogImages: 'loading...'
            })
            fetch(dogAPI)
                .then(response => response.json())
                .then(data => {
                    updateDogImage(data);
                });
        }
        const buttonText = 'Get a Random Dog Image / Video';
        return (
            <div>
                <button onClick={onGetRandomDogImg}>{buttonText}</button>
                <span>You have clicked {this.state.dogCount} times</span>
                <p>Images: {this.state.imgCount} / Videos: {this.state.vidCount}</p>
                <div id="dog-gallery">{this.state.dogImages}</div>
            </div>
        );
    }
}
 
export default RandomDog;