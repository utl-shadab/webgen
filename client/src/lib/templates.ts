// Framework options
export const frameworks = [
  { id: 'none', name: 'None (HTML)', icon: 'html', defaultVersion: 'latest' },
  { id: 'javascript', name: 'JavaScript', icon: 'javascript', defaultVersion: 'ES6' },
  { id: 'typescript', name: 'TypeScript', icon: 'data_object', defaultVersion: '5.0.4' },
  { id: 'react', name: 'React', icon: 'code', defaultVersion: '18.2.0' },
  { id: 'nextjs', name: 'Next.js', icon: 'auto_awesome', defaultVersion: '13.4.3' },
  { id: 'vue', name: 'Vue', icon: 'view_compact', defaultVersion: '3.2.47' },
  { id: 'angular', name: 'Angular', icon: 'change_history', defaultVersion: '16.0.0' }
];

// Get available versions for a framework
export const getFrameworkVersions = (frameworkId: string): string[] => {
  // This would be fetched from an API in a real application
  // For now, return hardcoded versions for each framework
  switch (frameworkId) {
    case 'none':
      return ['latest'];
    case 'javascript':
      return ['ES6', 'ES2020', 'ES2022'];
    case 'typescript':
      return ['5.0.4', '4.9.5', '4.8.4'];
    case 'react':
      return ['latest', '18.2.0', '18.1.0', '17.0.2'];
    case 'nextjs':
      return ['latest', '13.4.3', '13.3.0', '12.3.4'];
    case 'vue':
      return ['latest', '3.2.47', '3.2.45', '2.7.14'];
    case 'angular':
      return ['latest', '16.0.0', '15.2.0', '14.2.12'];
    default:
      return ['latest'];
  }
};

// Library options for different framework types
export const getStylingLibraries = (frameworkId: string) => {
  const commonOptions = [
    { id: 'tailwind', name: 'Tailwind CSS' },
    { id: 'sass', name: 'SASS' }
  ];

  switch (frameworkId) {
    case 'react':
    case 'nextjs':
      return [
        ...commonOptions,
        { id: 'shadcn', name: 'Shadcn UI' },
        { id: 'materialui', name: 'Material UI' },
        { id: 'bootstrap', name: 'Bootstrap' }
      ];
    case 'vue':
      return [
        ...commonOptions,
        { id: 'vuetify', name: 'Vuetify' },
        { id: 'bootstrap', name: 'Bootstrap Vue' }
      ];
    case 'angular':
      return [
        ...commonOptions,
        { id: 'material', name: 'Angular Material' },
        { id: 'bootstrap', name: 'ng-bootstrap' }
      ];
    default:
      return commonOptions;
  }
};

export const getStateLibraries = (frameworkId: string) => {
  switch (frameworkId) {
    case 'react':
    case 'nextjs':
      return [
        { id: 'redux', name: 'Redux Toolkit' },
        { id: 'recoil', name: 'Recoil' },
        { id: 'zustand', name: 'Zustand' }
      ];
    case 'vue':
      return [
        { id: 'vuex', name: 'Vuex' },
        { id: 'pinia', name: 'Pinia' }
      ];
    case 'angular':
      return [
        { id: 'ngrx', name: 'NgRx' }
      ];
    default:
      return [];
  }
};

export const getTestingLibraries = () => {
  return [
    { id: 'jest', name: 'Jest' },
    { id: 'mocha', name: 'Mocha' },
    { id: 'vitest', name: 'Vitest' }
  ];
};

export const getAnimationLibraries = (frameworkId: string) => {
  const common = [
    { id: 'gsap', name: 'GSAP' }
  ];

  switch (frameworkId) {
    case 'react':
    case 'nextjs':
      return [
        ...common,
        { id: 'framer', name: 'Framer Motion' }
      ];
    case 'vue':
      return [
        ...common,
        { id: 'motion', name: 'Motion One' }
      ];
    case 'angular':
      return [
        ...common,
        { id: 'animations', name: 'Angular Animations' }
      ];
    default:
      return common;
  }
};

// Helper functions for display
export const getFrameworkDisplay = (frameworkId: string): string => {
  const framework = frameworks.find(f => f.id === frameworkId);
  return framework ? framework.name : 'None';
};

export const getLibraryNames = (libraryIds: string[]): string[] => {
  const allLibraries = [
    { id: 'tailwind', name: 'Tailwind CSS' },
    { id: 'shadcn', name: 'Shadcn UI' },
    { id: 'materialui', name: 'Material UI' },
    { id: 'bootstrap', name: 'Bootstrap' },
    { id: 'sass', name: 'SASS' },
    { id: 'redux', name: 'Redux Toolkit' },
    { id: 'recoil', name: 'Recoil' },
    { id: 'zustand', name: 'Zustand' },
    { id: 'vuex', name: 'Vuex' },
    { id: 'pinia', name: 'Pinia' },
    { id: 'ngrx', name: 'NgRx' },
    { id: 'jest', name: 'Jest' },
    { id: 'mocha', name: 'Mocha' },
    { id: 'vitest', name: 'Vitest' },
    { id: 'gsap', name: 'GSAP' },
    { id: 'framer', name: 'Framer Motion' },
    { id: 'motion', name: 'Motion One' },
    { id: 'animations', name: 'Angular Animations' },
    { id: 'vuetify', name: 'Vuetify' },
    { id: 'material', name: 'Angular Material' },
  ];

  return libraryIds.map(id => {
    const lib = allLibraries.find(l => l.id === id);
    return lib ? lib.name : id;
  });
};

export const getFolderDisplay = (folderIds: string[]): string[] => {
  return folderIds.map(id => `${id}/`);
};
