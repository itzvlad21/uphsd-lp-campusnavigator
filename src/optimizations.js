
const textureCache = new Map();

const objectPool = {
  geometry: null,
  material: null
};

const hotspotPool = {
    geometry: null,
    material: null,
    iconGeometry: null,
    iconMaterials: {}
};

const navPool = {
    arrow: {
        geometries: {},
        materials: {}
    },
    path: {
        geometries: {},
        materials: {}
    },
    sphere: {
        geometry: null,
        material: null
    }
};

window.addEventListener('beforeunload', () => {
    textureCache.forEach(texture => {
        texture.dispose();
    });
    textureCache.clear();
    
    if (objectPool.geometry) {
        objectPool.geometry.dispose();
        objectPool.geometry = null;
    }
    
    if (objectPool.material) {
        objectPool.material.dispose();
        objectPool.material = null;
    }
    
    if (hotspotPool.geometry) {
        hotspotPool.geometry.dispose();
        hotspotPool.geometry = null;
    }
    
    if (hotspotPool.material) {
        hotspotPool.material.dispose();
        hotspotPool.material = null;
    }
    
    if (hotspotPool.iconGeometry) {
        hotspotPool.iconGeometry.dispose();
        hotspotPool.iconGeometry = null;
    }
    
    Object.values(hotspotPool.iconMaterials).forEach(material => {
        if (material) material.dispose();
    });
    
    Object.values(navPool.arrow.geometries).forEach(geoSet => {
        if (geoSet.line) geoSet.line.dispose();
        if (geoSet.head) geoSet.head.dispose();
    });
    
    Object.values(navPool.path.geometries).forEach(geo => {
        if (geo) geo.dispose();
    });
    
    if (navPool.sphere.geometry) {
        navPool.sphere.geometry.dispose();
    }
    
    Object.values(navPool.arrow.materials).forEach(mat => {
        if (mat) mat.dispose();
    });
    
    Object.values(navPool.path.materials).forEach(mat => {
        if (mat) mat.dispose();
    });
    
    if (navPool.sphere.material) {
        navPool.sphere.material.dispose();
    }
});

// Device detection
const DeviceDetection = {
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    isTablet: function() {
        return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    },
    
    isDesktop: function() {
        return !this.isMobile() && !this.isTablet();
    },
    
    isLowEndDevice: function() {
        const lowMemory = navigator.deviceMemory !== undefined && navigator.deviceMemory <= 4;
        const slowCPU = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
        return (lowMemory && slowCPU) || (this.isMobile() && (lowMemory || slowCPU));
    },
    
    supportsWebGL: function() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }
};