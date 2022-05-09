import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

import { GestureDetector, GestureHandlerRootView, Gesture, FlatList } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSpring, 
  interpolate,
  interpolateColors,
  Extrapolate
} from 'react-native-reanimated';

import Header from './src/Components/Header';
import { AntDesign } from '@expo/vector-icons';

const OPTIONS = [
  {
    name: "Me ajuda",
    icon: "questioncircle"
  },
  {
    name: "Perfil",
    icon: "user"
  },
  {
    name: "Configurar cartão",
    icon: "creditcard"
  },
  {
    name: "Configurações do app",
    icon: "mobile1"
  }
]

const { height, width } = Dimensions.get('screen');

export default function App() {
  const scrollY = useSharedValue(0);
  const context = useSharedValue({ y: 0});
  
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: scrollY.value };
  })
  .onUpdate((event) => {
    scrollY.value = event.translationY + context.value.y;
    
    if(scrollY.value >= 450){
      scrollY.value = withSpring(450);
      return
    }

    if(scrollY.value <= 0) scrollY.value = withSpring(0)
  })
  .onEnd(event => {
    if(scrollY.value >= 300 && scrollY.value < 450){
      scrollY.value = withSpring(450);
    }
  })

  const handleAnimatedCard = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(scrollY.value, {
            stiffness: 120,
            damping: 110,
          })
        }
      ],
      borderRadius: interpolate(
        scrollY.value,
        [0, 160, 300],
        [4, 8, 12]
      ),
     
    }
  });

  const handleAnimatedOptions = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 160, 300],
        [0, 0.5, 1]
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [0, 50, 300],
            [0.5, 0.5 , 1],
            Extrapolate.CLAMP
          )
        },
        {
          translateY: interpolate(
            scrollY.value,
            [0, 300],
            [0, -20],
            Extrapolate.CLAMP
          ),
        }
      ]
    }
  })

  return (
    <View style={styles.container}>
      <Header />
      <GestureHandlerRootView style={{ flex: 2}}> 
        <GestureDetector gesture={gesture}>
          <View style={styles.cardContainer}>
            <Animated.View style={[styles.card, handleAnimatedCard]}>
              <View>
                <AntDesign name="creditcard" size={24} color="#262626" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>FATURA FECHADA</Text>
                <Text style={styles.cardPrice}>R$ <Text>1.1380</Text>,00</Text>
                <Text style={styles.cardDescription}>VENCIMENTO 25 DE MAIO</Text>
              </View>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.buttonTitle}>PAGAR</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.options, handleAnimatedOptions]}>
              <View style={{ backgroundColor: "#f2f2f2", borderRadius: 12 }}>
                <AntDesign name="qrcode" size={160} color="#333" />
              </View>
              <View style={{ paddingVertical: 16, marginVertical: 16}}>
                {OPTIONS.map((item, index) => {
                  return(
                    <TouchableOpacity key={`OPTION-${index}`} style={styles.list}>
                      <View>
                        <AntDesign name={item.icon} size={24} color={"#f2f2f2"} />
                      </View>
                      <View>
                        <Text style={styles.listText}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </Animated.View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B10AE',
  },
  cardContainer: {
    flex: 2,
    alignItems: 'center',
  },
  card: {
    backgroundColor: "#f2f2f2",
    width: width * 0.8,
    height: 300,
    borderRadius: 4,
    padding: 16,
    position: 'absolute',
    top: -100,
    zIndex: 100
  },
  cardInfo: {
    marginTop: 24
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#D26662'
  },
  cardPrice: {
    fontSize: 32,
    fontWeight: '900',
    color: '#D26662',
    paddingVertical: 8
  },
  cardDescription: {
    fontSize: 12,
    fontWeight: '900',
    color: '#c2c2c2',
  },
  cardButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#D26662',
    width: 150,
    padding: 8,
    borderRadius: 4,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#D26662',
    textAlign: 'center'
  },
  options: {
    position: 'absolute',
    top: -80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    width: width * 0.7,
    padding: 14,
    borderRadius: 4,
  },
  list: {
    width: width * 0.8,
    padding: 12,
    marginVertical: 4,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#c2c2c2",
  },
  listText: {
    fontSize: 14,
    color: "#f2f2f2",
    marginLeft: 32
  }
});
