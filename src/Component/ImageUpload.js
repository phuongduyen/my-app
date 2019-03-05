class RotateIMG extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rotation: 0 // nghieng
    }
    
    this.rotate = this.rotate.bind(this);
    this.rotateleft = this.rotateleft.bind(this);
  }
  
  rotate(){
    let newRotation = this.state.rotation + 50;
    if(newRotation >= 360){
      newRotation -=360;
    }
    this.setState({
      rotation: newRotation,
    })
  }
  
  rotateleft(){
    let newRotation = this.state.rotation -40;
    if(newRotation >= 360){
      newRotation -= 360;
    }
    this.setState({
      rotation: newRotation,
    })
  }
  
  render(){
    const { rotation } =  this.state;
    return 
    <div>
      <input onClick={this.rotateleft} type="button" value="left" />
      <img style={{transform: `rotate(${rotation}deg)`}} src={this.props.src} width="400" />
      <input onClick={this.rotate} type="button" value="right" />
      
    </div>
  }
};

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imagePreviewUrl: 'https://www.google.com/search?q=image&safe=active&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjlleHM1OrgAhVkF6YKHeVqCQQQ_AUIDigB&biw=1920&bih=947#imgrc=Tck2Y_BFj_sFFM:'};
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<RotateIMG src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }

    return (
      <div className="previewComponent">

        <div className="imgPreview">
          {$imagePreview}
        </div> 

        <img src="https://www.google.com/search?q=image&safe=active&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjlleHM1OrgAhVkF6YKHeVqCQQQ_AUIDigB&biw=1920&bih=947#imgrc=Tck2Y_BFj_sFFM:" class="img-responsive" alt="Image">
      </div>
    )
  }
}
  
ReactDOM.render(<ImageUpload />, document.getElementById("mainApp"));