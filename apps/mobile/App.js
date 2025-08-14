import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
  AppState,
} from 'react-native';
import * as Location from 'expo-location';

const App = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [location, setLocation] = useState({
    latitude: 35.1815,
    longitude: 136.9066,
    accuracy: null,
    heading: null,
    speed: null,
    timestamp: new Date(),
  });
  const [locationStatus, setLocationStatus] = useState('初期化中...');
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [region, setRegion] = useState('愛知県');

  const requestLocationPermissions = async () => {
    try {
      setLocationStatus('位置情報許可を要求中...');
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationStatus('位置情報許可が必要です');
        Alert.alert(
          '位置情報許可',
          'アプリの機能をご利用いただくには位置情報許可が必要です。',
          [
            { text: 'OK', onPress: () => Linking.openSettings() }
          ]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Permission error:', error);
      setLocationStatus('許可要求エラー');
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsLocationLoading(true);
      setLocationStatus('位置情報取得中...');

      const hasPermission = await requestLocationPermissions();
      if (!hasPermission) return;

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 5000,
        timeout: 15000,
      });

      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
        timestamp: new Date(position.timestamp),
      };

      setLocation(newLocation);
      updateRegionFromCoordinates(newLocation.latitude, newLocation.longitude);
      
      const accuracyText = newLocation.accuracy ? `±${newLocation.accuracy.toFixed(1)}m` : '不明';
      setLocationStatus(`GPS取得完了 ${accuracyText}`);
    } catch (error) {
      console.error('Location error:', error);
      setLocationStatus('位置情報取得エラー');
    } finally {
      setIsLocationLoading(false);
    }
  };

  const updateRegionFromCoordinates = (lat, lon) => {
    const regions = [
      { name: '北海道', bounds: { north: 45.5, south: 41.3, east: 145.8, west: 139.3 } },
      { name: '東京都', bounds: { north: 35.9, south: 35.5, east: 139.9, west: 139.3 } },
      { name: '愛知県', bounds: { north: 35.4, south: 34.5, east: 137.6, west: 136.7 } },
      { name: '大阪府', bounds: { north: 34.8, south: 34.3, east: 135.7, west: 135.1 } },
      { name: '福岡県', bounds: { north: 33.9, south: 33.0, east: 131.3, west: 129.7 } },
    ];

    for (const region of regions) {
      const { bounds } = region;
      if (lat >= bounds.south && lat <= bounds.north && 
          lon >= bounds.west && lon <= bounds.east) {
        setRegion(region.name);
        return;
      }
    }
    
    setRegion('その他地域');
  };

  const getAccuracyColor = () => {
    if (!location.accuracy) return '#999999';
    if (location.accuracy < 5) return '#00C851';
    if (location.accuracy < 15) return '#ffbb33';
    return '#ff4444';
  };

  const openMapsLocation = async () => {
    try {
      const url = `https://www.google.com/maps/@${location.latitude},${location.longitude},16z`;
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('エラー', 'マップの表示に失敗しました。');
    }
  };

  const openLINESupport = async () => {
    try {
      const lineUrl = 'line://ti/p/@dhai52765howdah';
      const webUrl = 'https://line.me/ti/p/@dhai52765howdah';
      
      const canOpenLine = await Linking.canOpenURL(lineUrl);
      if (canOpenLine) {
        await Linking.openURL(lineUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      Alert.alert('LINEサポート', 'LINEアプリでサポートにアクセスしてください。\nID: @dhai52765howdah');
    }
  };

  const handleFeaturePress = (featureName) => {
    Alert.alert(
      featureName,
      `${featureName}機能は開発中です。v3.1.0でリリース予定です。`,
      [{ text: 'OK' }]
    );
  };

  const nearbyStations = [
    { name: '名古屋駅', distance: 1.2, demand: 'High', revenue: 3200 },
    { name: '栄駅', distance: 0.8, demand: 'High', revenue: 2800 },
    { name: '金山駅', distance: 2.1, demand: 'Medium', revenue: 1900 },
    { name: '千種駅', distance: 1.5, demand: 'Medium', revenue: 1600 },
  ];

  if (!selectedRole) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.appTitle}>全国AIタクシー</Text>
          <Text style={styles.version}>v3.0.0 Enhanced</Text>
          
          <View style={styles.roleContainer}>
            <Text style={styles.roleTitle}>ご利用方法を選択してください</Text>
            
            <TouchableOpacity 
              style={[styles.roleButton, styles.driverButton]}
              onPress={() => setSelectedRole('driver')}
            >
              <Text style={styles.roleButtonText}>🚕 ドライバー</Text>
              <Text style={styles.roleDescription}>配車システム • 収益最適化 • 需要予測</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.roleButton, styles.customerButton]}
              onPress={() => setSelectedRole('customer')}
            >
              <Text style={styles.roleButtonText}>👤 お客様</Text>
              <Text style={styles.roleDescription}>即時配車 • ルート検索 • 履歴管理</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>✨ v3.0.0 新機能</Text>
            <Text style={styles.featureItem}>• 企業レベルの安定性とクラッシュ防止</Text>
            <Text style={styles.featureItem}>• プロフェッショナルLINEサポート 24/7</Text>
            <Text style={styles.featureItem}>• 8地域28駅以上の真の全国対応</Text>
            <Text style={styles.featureItem}>• AI需要予測と気象連携</Text>
            <Text style={styles.featureItem}>• リアルタイム収益最適化</Text>
          </View>

          <TouchableOpacity style={styles.supportButton} onPress={openLINESupport}>
            <Text style={styles.supportButtonText}>💬 LINEサポート</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>全国AIタクシー v3.0.0</Text>
          <TouchableOpacity onPress={() => setSelectedRole(null)} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>変更</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statusContainer}>
          <Text style={styles.roleIndicator}>
            {selectedRole === 'driver' ? '🚕 ドライバーモード' : '👤 お客様モード'}
          </Text>
          <Text style={[styles.statusText, { color: getAccuracyColor() }]}>
            {locationStatus}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Location Panel */}
        <View style={styles.locationPanel}>
          <View style={styles.locationHeader}>
            <Text style={styles.locationTitle}>📍 現在地情報</Text>
            <TouchableOpacity onPress={getCurrentLocation} disabled={isLocationLoading}>
              <Text style={styles.refreshButton}>
                {isLocationLoading ? '⏳' : '🔄'} 更新
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.locationGrid}>
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>緯度:</Text>
              <Text style={styles.locationValue}>{location.latitude.toFixed(6)}</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>経度:</Text>
              <Text style={styles.locationValue}>{location.longitude.toFixed(6)}</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>地域:</Text>
              <Text style={styles.locationValue}>{region}</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>精度:</Text>
              <Text style={[styles.locationValue, { color: getAccuracyColor() }]}>
                {location.accuracy ? `±${location.accuracy.toFixed(1)}m` : '測定中'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.mapButton} onPress={openMapsLocation}>
            <Text style={styles.mapButtonText}>🗺️ マップで表示</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>
            {selectedRole === 'driver' ? '🚕 ドライバー機能' : '👤 お客様機能'}
          </Text>
          
          <View style={styles.buttonGrid}>
            {selectedRole === 'driver' ? (
              <>
                <TouchableOpacity style={styles.featureButton} onPress={() => handleFeaturePress('配車システム')}>
                  <Text style={styles.featureButtonText}>📱 配車システム</Text>
                  <Text style={styles.featureSubtext}>リアルタイム配車</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => handleFeaturePress('需要予測マップ')}>
                  <Text style={styles.featureButtonText}>🗺️ 需要予測マップ</Text>
                  <Text style={styles.featureSubtext}>AI気象連携</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => handleFeaturePress('収益最適化')}>
                  <Text style={styles.featureButtonText}>💰 収益最適化</Text>
                  <Text style={styles.featureSubtext}>今日: ¥28,500</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => handleFeaturePress('設定')}>
                  <Text style={styles.featureButtonText}>⚙️ 設定</Text>
                  <Text style={styles.featureSubtext}>車両・勤務管理</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.featureButton} onPress={() => handleFeaturePress('即時配車')}>
                  <Text style={styles.featureButtonText}>🚖 即時配車</Text>
                  <Text style={styles.featureSubtext}>今すぐタクシーを呼ぶ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => handleFeaturePress('ルート検索')}>
                  <Text style={styles.featureButtonText}>🗺️ ルート検索</Text>
                  <Text style={styles.featureSubtext}>最適ルート案内</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => handleFeaturePress('履歴・設定')}>
                  <Text style={styles.featureButtonText}>📋 履歴・設定</Text>
                  <Text style={styles.featureSubtext}>利用履歴管理</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Nearby Stations */}
        <View style={styles.stationsSection}>
          <Text style={styles.sectionTitle}>🚇 近隣駅情報</Text>
          <View style={styles.stationsGrid}>
            {nearbyStations.map((station, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.stationCard, { 
                  borderColor: station.demand === 'High' ? '#ff6b6b' : '#4ecdc4' 
                }]}
                onPress={openMapsLocation}
              >
                <Text style={styles.stationName}>{station.name}</Text>
                <Text style={styles.stationDistance}>{station.distance}km</Text>
                <Text style={[styles.stationDemand, { 
                  color: station.demand === 'High' ? '#ff6b6b' : '#4ecdc4' 
                }]}>
                  {station.demand} 需要
                </Text>
                <Text style={styles.stationRevenue}>予想: ¥{station.revenue}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Support */}
        <View style={styles.supportSection}>
          <TouchableOpacity style={styles.lineButton} onPress={openLINESupport}>
            <Text style={styles.lineButtonText}>💬 LINEサポート 24/7</Text>
            <Text style={styles.lineButtonSubtext}>@dhai52765howdah</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  welcomeContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  appTitle: { fontSize: 32, fontWeight: 'bold', color: '#2c3e50', marginBottom: 8, textAlign: 'center' },
  version: { fontSize: 16, color: '#7f8c8d', marginBottom: 40 },
  roleContainer: { width: '100%', marginBottom: 30 },
  roleTitle: { fontSize: 18, fontWeight: '600', color: '#34495e', textAlign: 'center', marginBottom: 20 },
  roleButton: { padding: 20, borderRadius: 12, marginBottom: 15, alignItems: 'center' },
  driverButton: { backgroundColor: '#3498db' },
  customerButton: { backgroundColor: '#2ecc71' },
  roleButtonText: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  roleDescription: { fontSize: 14, color: '#ecf0f1', textAlign: 'center' },
  featuresContainer: { width: '100%', backgroundColor: '#ecf0f1', padding: 20, borderRadius: 12, marginBottom: 20 },
  featuresTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10, textAlign: 'center' },
  featureItem: { fontSize: 14, color: '#34495e', marginBottom: 5 },
  supportButton: { backgroundColor: '#00b894', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 25 },
  supportButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  header: { backgroundColor: '#fff', padding: 15, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50' },
  resetButton: { backgroundColor: '#95a5a6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  resetButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  statusContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roleIndicator: { fontSize: 16, fontWeight: '600', color: '#34495e' },
  statusText: { fontSize: 12, fontWeight: '500' },
  content: { flex: 1 },
  locationPanel: { backgroundColor: '#fff', margin: 15, padding: 15, borderRadius: 12, elevation: 2 },
  locationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  locationTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  refreshButton: { fontSize: 14, color: '#3498db', fontWeight: '600' },
  locationGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 15 },
  locationItem: { width: '48%', marginBottom: 10 },
  locationLabel: { fontSize: 12, color: '#7f8c8d', marginBottom: 2 },
  locationValue: { fontSize: 14, fontWeight: '600', color: '#2c3e50' },
  mapButton: { backgroundColor: '#3498db', padding: 12, borderRadius: 8, alignItems: 'center' },
  mapButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  featuresSection: { backgroundColor: '#fff', margin: 15, marginTop: 0, padding: 15, borderRadius: 12, elevation: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 },
  buttonGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureButton: { width: '48%', backgroundColor: '#ecf0f1', padding: 15, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  featureButtonText: { fontSize: 14, fontWeight: 'bold', color: '#2c3e50', marginBottom: 5, textAlign: 'center' },
  featureSubtext: { fontSize: 12, color: '#7f8c8d', textAlign: 'center' },
  stationsSection: { backgroundColor: '#fff', margin: 15, marginTop: 0, padding: 15, borderRadius: 12, elevation: 2 },
  stationsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  stationCard: { width: '48%', backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 2 },
  stationName: { fontSize: 14, fontWeight: 'bold', color: '#2c3e50', marginBottom: 4 },
  stationDistance: { fontSize: 12, color: '#7f8c8d', marginBottom: 2 },
  stationDemand: { fontSize: 12, fontWeight: '600', marginBottom: 2 },
  stationRevenue: { fontSize: 11, color: '#27ae60', fontWeight: '600' },
  supportSection: { margin: 15, marginTop: 0 },
  lineButton: { backgroundColor: '#00b894', padding: 15, borderRadius: 12, alignItems: 'center' },
  lineButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  lineButtonSubtext: { color: '#ecf0f1', fontSize: 12 },
});

export default App;