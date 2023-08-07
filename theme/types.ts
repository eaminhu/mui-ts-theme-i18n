export {}

declare module '@mui/material/styles' {
    interface Theme {
        palette: {
            mode: 'dark'
            isDark: boolean
            common: {
                black: '#000'
                white: '#fff'
            }
            primary: {
                lighter: '#FEF4D4'
                light: '#FED680'
                main: '#fda92d'
                dark: '#B66816'
                darker: '#793908'
                contrastText: '#fff'
            }
            secondary: {
                lighter: '#D6E4FF'
                light: '#84A9FF'
                main: '#3366FF'
                dark: '#1939B7'
                darker: '#091A7A'
                contrastText: '#fff'
            }
            info: {
                lighter: '#D0F2FF'
                light: '#74CAFF'
                main: '#1890FF'
                dark: '#0C53B7'
                darker: '#04297A'
                contrastText: '#fff'
            }
            success: {
                lighter: '#E9FCD4'
                light: '#AAF27F'
                main: '#54D62C'
                dark: '#229A16'
                darker: '#08660D'
                contrastText: '#212B36'
            }
            warning: {
                lighter: '#FFF7CD'
                light: '#FFE16A'
                main: '#FFC107'
                dark: '#B78103'
                darker: '#7A4F01'
                contrastText: '#212B36'
            }
            error: {
                lighter: '#FFE7D9'
                light: '#FFA48D'
                main: '#FF4842'
                dark: '#B72136'
                darker: '#7A0C2E'
                contrastText: '#fff'
            }
            grey: {
                '0': '#FFFFFF'
                '100': '#F9FAFB'
                '200': '#F4F6F8'
                '300': '#DFE3E8'
                '400': '#C4CDD5'
                '500': '#919EAB'
                '600': '#637381'
                '700': '#454F5B'
                '800': '#212B36'
                '900': '#161C24'
            }
            divider: 'rgba(145, 158, 171, 0.24)'
            text: {
                primary: '#212B36'
                secondary: '#637381'
                disabled: '#919EAB'
            }
            background: {
                paper: '#fff'
                default: '#F9FAFB'
                neutral: '#F4F6F8'
            }
            action: {
                active: '#637381'
                hover: 'rgba(145, 158, 171, 0.08)'
                selected: 'rgba(145, 158, 171, 0.16)'
                disabled: 'rgba(145, 158, 171, 0.8)'
                disabledBackground: 'rgba(145, 158, 171, 0.24)'
                focus: 'rgba(145, 158, 171, 0.24)'
                hoverOpacity: 0.08
                disabledOpacity: 0.48
            }
        }
        customShadows: {
            z1: '0 1px 2px 0 rgba(145, 158, 171, 0.16)'
            z4: '0 4px 8px 0 rgba(145, 158, 171, 0.16)'
            z8: '0 8px 16px 0 rgba(145, 158, 171, 0.16)'
            z12: '0 12px 24px -4px rgba(145, 158, 171, 0.16)'
            z16: '0 16px 32px -4px rgba(145, 158, 171, 0.16)'
            z20: '0 20px 40px -4px rgba(145, 158, 171, 0.16)'
            z24: '0 24px 48px 0 rgba(145, 158, 171, 0.16)'
            primary: '0 8px 16px 0 rgba(253, 169, 45, 0.24)'
            info: '0 8px 16px 0 rgba(24, 144, 255, 0.24)'
            secondary: '0 8px 16px 0 rgba(51, 102, 255, 0.24)'
            success: '0 8px 16px 0 rgba(84, 214, 44, 0.24)'
            warning: '0 8px 16px 0 rgba(255, 193, 7, 0.24)'
            error: '0 8px 16px 0 rgba(255, 72, 66, 0.24)'
            card: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)'
            dialog: '-40px 40px 80px -8px rgba(145, 158, 171, 0.24)'
            dropdown: '0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)'
        }
    }
}
