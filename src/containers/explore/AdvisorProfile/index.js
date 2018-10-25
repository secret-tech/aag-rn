import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, Text, View, Image } from 'react-native';
import { Container, Content, Button, Icon } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { openOrCreateRoom } from '../../../redux/ducks/chat/room';

import s from './styles';

export const WS = Dimensions.get('window');
export const sliderWidth = WS.width;
export const largeSlideWidth = WS.width;

const DATA = [
  { picture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { picture: 'https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { picture: 'https://images.pexels.com/photos/415276/pexels-photo-415276.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { picture: 'https://images.pexels.com/photos/580631/pexels-photo-580631.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { picture: 'https://images.pexels.com/photos/206434/pexels-photo-206434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { picture: 'https://images.pexels.com/photos/185517/pexels-photo-185517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { picture: 'https://images.pexels.com/photos/875862/pexels-photo-875862.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { picture: 'https://images.pexels.com/photos/735552/pexels-photo-735552.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }
];

class AdvisorProfile extends Component {
  state = {
    activeSlide: 0
  }

  capitalize = (string) => string && string.charAt(0).toUpperCase() + string.slice(1);

  itemRenderer = (picture) => {
    return (
      <View style={{ ...s.pictureWrapper, height: largeSlideWidth, width: largeSlideWidth }}>
        <Image style={s.picture} source={{ uri: picture.item }} resizeMode="cover" />
        <View style={s.pictureFrontdrop}/>
      </View>
    );
  }

  render() {
    const {
      _id,
      pictures,
      name,
      bio,
      gender,
      tags
    } = this.props.navigation.state.params;

    return (
      <Container style={s.container}>
        <Content>
          <View style={s.carousel}>
            <Button transparent style={s.back} onPress={() => this.props.navigation.goBack()}>
              <Icon type="SimpleLineIcons" name="arrow-left" style={{ fontSize: 20, color: '#fff' }}/>
            </Button>

            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={pictures}
              renderItem={this.itemRenderer}
              sliderWidth={sliderWidth}
              itemWidth={largeSlideWidth}
              onSnapToItem={(activeSlide) => this.setState({ activeSlide })}/>

            <View style={s.paginationWrapper}>
              <Pagination
                dotsLength={DATA.length}
                activeDotIndex={this.state.activeSlide}
                dotStyle={s.dotStyle}
                inactiveDotOpacity={0.5}
                inactiveDotScale={0.7}/>
            </View>

            <Button transparent style={s.connect} onPress={() => this.props.openOrCreateRoom(_id)}>
              <Icon type="SimpleLineIcons" name="bubbles" style={{ fontSize: 24, color: '#fff', padding: 0, margin: 0 }}/>
            </Button>
          </View>

          <View style={s.info}>
            <Text style={s.name}>{name}</Text>
            <Text style={s.gender}>{this.capitalize(gender)}</Text>
          </View>

          <View style={s.bioWrap}>
            <Text style={s.bio}>{bio}</Text>
          </View>

          <View style={s.tags}>
            {tags.map((tag, i) => <Text style={s.tag} key={`${tag}-${i}`}>{tag}</Text>)}
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(
  null,
  {
    openOrCreateRoom
  }
)(AdvisorProfile);
