import { MessageType, showMessage } from "react-native-flash-message";

interface NotificationProps {
    type: MessageType;
    description?: string;

}

export const showNotification = ({ type, description }: NotificationProps) => {
    
    const message = {
        none: 'None',
        default: 'Default',
        info: 'Info',
        success: 'Sucesso',
        danger: 'Erro',
        warning: 'Atenção',
    }

    const textColors = {
        none: '#fff',
        default: '#fff',
        info: '#fff',
        success: '#22C55E',
        danger: '#DC2626',
        warning: '#FFCE52',
    }
    
    showMessage({
        message: message[type],
        titleStyle: {
            color: textColors[type],
        },
        description,
        type,
        duration: 5000,
        backgroundColor: '#08090A',
        style: {
            marginTop: 40,
            marginHorizontal: 20,
            padding: 20,
            borderWidth: 1,
            borderColor: '#404040',
            borderRadius: 8,
            alignItems: 'flex-start',
        },
    })
}