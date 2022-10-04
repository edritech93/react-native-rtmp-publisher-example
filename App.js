import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import RTMPPublisher from 'react-native-rtmp-publisher';

export default function App(props) {
  const [isStream, setIsStream] = useState(false);
  const publisherRef = useRef();

  useEffect(() => {
    async function _loadStatusStream() {
      const isActive = await publisherRef.current.isStreaming();
      setIsStream(isActive);
    }
    _loadStatusStream();
  }, []);

  const _onStartStream = async () => {
    setIsStream(true);
    await publisherRef.current.startStream();
  };

  const _onStopStream = async () => {
    setIsStream(false);
    await publisherRef.current.stopStream();
  };

  return (
    <View style={styles.container}>
      <RTMPPublisher
        ref={publisherRef}
        // streamURL={'rtmp://a.rtmp.youtube.com/live2'}
        // streamName={'stream_key_here'}
        streamURL={'rtmp://demo.flashphoner.com:1935/live/'}
        streamName={'live_stream'}
        onConnectionFailedRtmp={() => {
          console.log('------------------------------------');
          console.log('onConnectionFailedRtmp');
          console.log('------------------------------------');
        }}
        onConnectionStartedRtmp={() => {
          console.log('------------------------------------');
          console.log('onConnectionStartedRtmp');
          console.log('------------------------------------');
        }}
        onConnectionSuccessRtmp={() => {
          console.log('------------------------------------');
          console.log('onConnectionSuccessRtmp');
          console.log('------------------------------------');
        }}
        onDisconnectRtmp={() => {
          console.log('------------------------------------');
          console.log('onDisconnectRtmp');
          console.log('------------------------------------');
        }}
        onNewBitrateRtmp={() => {
          console.log('------------------------------------');
          console.log('onNewBitrateRtmp');
          console.log('------------------------------------');
        }}
        onStreamStateChanged={state => {
          console.log('------------------------------------');
          console.log('onStreamStateChanged => ', state);
          console.log('------------------------------------');
        }}
        style={styles.wrapCamera}
      />
      <View style={styles.wrapAction}>
        <Text style={styles.textDesc}>{'Testing Stream RTMP'}</Text>
        <Button
          mode={'contained'}
          disabled={isStream}
          onPress={_onStartStream}
          style={styles.btnStart}>
          Start
        </Button>
        <Button mode={'contained'} disabled={!isStream} onPress={_onStopStream}>
          Stop
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  wrapCamera: {
    flex: 1,
  },
  wrapAction: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
  },
  textDesc: {
    color: 'black',
    marginBottom: 8,
    textAlign: 'center',
  },
  btnStart: {
    marginBottom: 16,
  },
});
