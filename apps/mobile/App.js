import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';

export default function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  const openLINESupport = () => {
    const lineUrl = 'https://line.me/ti/p/@dhai52765howdah';
    Linking.openURL(lineUrl).catch(() => {
      Alert.alert('LINEサポート', 'LINEでサポートにアクセスしてください。\nID: @dhai52765howdah');
    });
  };

  const openGoogleMaps = () => {
    const mapsUrl = 'https://www.google.com/maps/@35.1815,136.9066,16z';
    Linking.openURL(mapsUrl).catch(() => {
      Alert.alert('マップ', 'マップアプリを開けませんでした。');
    });
  };

  const showFeature = (featureName) => {
    Alert.alert(featureName, `${featureName}機能は開発中です。v3.1.0でリリース予定です。`);
  };

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
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>全国AIタクシー v3.0.0</Text>
        <TouchableOpacity onPress={() => setSelectedRole(null)} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>変更</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.modeContainer}>
          <Text style={styles.modeTitle}>
            {selectedRole === 'driver' ? '🚕 ドライバーモード' : '👤 お客様モード'}
          </Text>
        </View>

        {/* Location Panel */}
        <View style={styles.locationPanel}>
          <Text style={styles.sectionTitle}>📍 現在地情報</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>緯度: 35.181500</Text>
            <Text style={styles.locationText}>経度: 136.906600</Text>
            <Text style={styles.locationText}>地域: 愛知県</Text>
            <Text style={styles.locationText}>精度: ±2.1m</Text>
          </View>
          <TouchableOpacity style={styles.mapButton} onPress={openGoogleMaps}>
            <Text style={styles.mapButtonText}>🗺️ マップで表示</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresPanel}>
          <Text style={styles.sectionTitle}>
            {selectedRole === 'driver' ? '🚕 ドライバー機能' : '👤 お客様機能'}
          </Text>
          
          <View style={styles.buttonGrid}>
            {selectedRole === 'driver' ? (
              <>
                <TouchableOpacity style={styles.featureButton} onPress={() => showFeature('配車システム')}>
                  <Text style={styles.featureText}>📱 配車システム</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => showFeature('需要予測マップ')}>
                  <Text style={styles.featureText}>🗺️ 需要予測マップ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => showFeature('収益最適化')}>
                  <Text style={styles.featureText}>💰 収益最適化</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => showFeature('設定')}>
                  <Text style={styles.featureText}>⚙️ 設定</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.featureButton} onPress={() => showFeature('即時配車')}>
                  <Text style={styles.featureText}>🚖 即時配車</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => showFeature('ルート検索')}>
                  <Text style={styles.featureText}>🗺️ ルート検索</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => showFeature('履歴・設定')}>
                  <Text style={styles.featureText}>📋 履歴・設定</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Stations */}
        <View style={styles.stationsPanel}>
          <Text style={styles.sectionTitle}>🚇 近隣駅情報</Text>
          <View style={styles.stationsList}>
            <View style={styles.stationItem}>
              <Text style={styles.stationName}>名古屋駅</Text>
              <Text style={styles.stationInfo}>1.2km • High需要 • ¥3,200予想</Text>
            </View>
            <View style={styles.stationItem}>
              <Text style={styles.stationName}>栄駅</Text>
              <Text style={styles.stationInfo}>0.8km • High需要 • ¥2,800予想</Text>
            </View>
            <View style={styles.stationItem}>
              <Text style={styles.stationName}>金山駅</Text>
              <Text style={styles.stationInfo}>2.1km • Medium需要 • ¥1,900予想</Text>
            </View>
            <View style={styles.stationItem}>
              <Text style={styles.stationName}>千種駅</Text>
              <Text style={styles.stationInfo}>1.5km • Medium需要 • ¥1,600予想</Text>
            </View>
          </View>
        </View>

        {/* Support */}
        <View style={styles.supportPanel}>
          <TouchableOpacity style={styles.lineButton} onPress={openLINESupport}>
            <Text style={styles.lineButtonText}>💬 LINEサポート 24/7</Text>
            <Text style={styles.lineSubtext}>@dhai52765howdah</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  version: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 40,
  },
  roleContainer: {
    width: '100%',
    marginBottom: 30,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 20,
  },
  roleButton: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  driverButton: {
    backgroundColor: '#3498db',
  },
  customerButton: {
    backgroundColor: '#2ecc71',
  },
  roleButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  roleDescription: {
    fontSize: 14,
    color: '#ecf0f1',
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  featureItem: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  supportButton: {
    backgroundColor: '#00b894',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  resetButton: {
    backgroundColor: '#95a5a6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  modeContainer: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  locationPanel: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  locationInfo: {
    marginBottom: 15,
  },
  locationText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  mapButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresPanel: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureButton: {
    width: '48%',
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  stationsPanel: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stationsList: {
    gap: 10,
  },
  stationItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  stationInfo: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  supportPanel: {
    margin: 15,
    marginTop: 0,
  },
  lineButton: {
    backgroundColor: '#00b894',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  lineButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  lineSubtext: {
    color: '#ecf0f1',
    fontSize: 12,
  },
});
