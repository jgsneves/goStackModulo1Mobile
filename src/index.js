import React, {useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import api from './service/api';

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'João'
        })

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#7159c1' />
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({item}) => (
                        <Text style={styles.project}>{item.title}</Text>
                    )}
                />

                <TouchableOpacity 
                    activeOpacity={0.7} 
                    style={styles.button} 
                    onPress={handleAddProject}>
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#ffffff',
        alignContent: 'center',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#ffffff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default App;