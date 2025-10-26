// db_facade.js

/**
 * CLASSE INTERNA: DBHandler (Simula a Camada de Acesso Direto ao SQLite/Dados)
 *
 * Em um ambiente real com Node.js ou Mobile, esta classe usaria o módulo 'sqlite3'
 * ou 'sql.js' para interagir diretamente com o banco de dados.
 * Aqui, usamos localStorage como um mock (simulação) do DB.
 */
class DBHandler {
    constructor(dbName = 'IESPORTE_EXERCISES', usersDbName = 'IESPORTE_USERS') {
        this.dbName = dbName;
        this.usersDbName = usersDbName;
        this._initializeDB();
    }

    // Inicializa o banco de dados com os dados iniciais, se não existirem
    _initializeDB() {
        if (!localStorage.getItem(this.dbName)) {
            console.log("DBHandler: Inicializando o banco de dados com dados padrão.");
            // Dados iniciais (os mesmos do seu código original)
            const initialData = [
                { id: 1, name: 'Elevação Pélvica', category: 'Força', focus: 'Glúteos, Lombares', duration: '3x 12 repetições', difficulty: 'Fácil', description: 'Deite-se de barriga para cima...', image: 'https://res.cloudinary.com/dzxbhjdkj/image/upload/v1761224869/elevacao-pelvica-de-quadril_a7ynpp.webp' },
                { id: 2, name: 'Agachamento Unilateral', category: 'Estabilidade', focus: 'Quadríceps, Equilíbrio', duration: '3x 8 repetições (cada perna)', difficulty: 'Médio', description: 'Fique em uma perna, mantendo o abdômen contraído...', image: 'https://res.cloudinary.com/dzxbhjdkj/image/upload/v1761224869/agachamento-unilateral-e-pistol-squat_d4ac7f.webp' },
                { id: 3, name: 'Prancha Lateral', category: 'Core', focus: 'Oblíquos, Estabilizadores', duration: '3x 30 segundos (cada lado)', difficulty: 'Médio', description: 'Apoie-se no antebraço e na lateral do pé...', image: 'https://res.cloudinary.com/dzxbhjdkj/image/upload/v1761224869/Pancha_Lateral_ua1kae.png' },
                { id: 4, name: 'Alongamento de Isquiotibiais', category: 'Flexibilidade', focus: 'Parte posterior da coxa', duration: '2x 30 segundos', difficulty: 'Fácil', description: 'Sente-se no chão com uma perna esticada...', image: 'https://res.cloudinary.com/dzxbhjdkj/image/upload/v1761224869/alongamento_isquiotibias_gnp7vu.jpg' },
                { id: 5, name: 'Mobilidade de Punhos', category: 'Mobilidade', focus: 'Punhos', duration: '30 segundos', difficulty: 'Fácil', description: 'Gire os punhos para um lado e para o outro...', image: 'https://res.cloudinary.com/dzxbhjdkj/image/upload/v1761224870/Mobilidade_Punhos_jtt5t3.png' },
                { id: 6, name: 'Círculos de Ombros', category: 'Mobilidade', focus: 'Ombros, Postura', duration: '10 repetições (para frente e para trás)', difficulty: 'Fácil', description: 'Faça círculos amplos com os ombros...', image: 'https://res.cloudinary.com/dzxbhjdkj/image/upload/v1761224869/C%C3%ADrculo_de_Ombros_wqbkmb.avif' },
                { id: 7, name: 'Rotação de Tronco Sentado', category: 'Mobilidade', focus: 'Tronco, Coluna', duration: '3x 5 repetições (cada lado)', difficulty: 'Fácil', description: 'Sentado com a coluna ereta, rotacione suavemente...', image: 'https://res.cloudinary.com/dzxbhjdkj/image/upload/v1761224870/Rota%C3%A7%C3%A3o_de_Tronco_Sentado_rzl0vb.png' }
            ];
            localStorage.setItem(this.dbName, JSON.stringify(initialData));
        }
        if (!localStorage.getItem(this.usersDbName)) {
            localStorage.setItem(this.usersDbName, JSON.stringify([]));
        }
    }

    // Simula uma consulta SELECT * FROM exercises
    async getAllExercises() {
        return JSON.parse(localStorage.getItem(this.dbName) || '[]');
    }

    // Simula uma consulta SELECT * FROM exercises WHERE id = ?
    async getExerciseById(id) {
        const exercises = await this.getAllExercises();
        return exercises.find(e => e.id === id);
    }

    // Simula uma consulta INSERT INTO exercises (...)
    async addExercise(exercise) {
        let exercises = await this.getAllExercises();
        // Simula o auto-incremento de ID
        const newId = exercises.length > 0 ? Math.max(...exercises.map(e => e.id)) + 1 : 1;
        const newExercise = {...exercise, id: newId };
        exercises.push(newExercise);
        localStorage.setItem(this.dbName, JSON.stringify(exercises));
        return newExercise;
    }

    // Simula uma consulta DELETE FROM users WHERE email = ?
    async deleteUserData(email) {
        // Em uma aplicação real, aqui o SQL real de deleção de usuário seria executado
        console.warn(`DBHandler: Excluindo dados do usuário com email: ${email}.`);
        let users = JSON.parse(localStorage.getItem(this.usersDbName) || '[]');
        users = users.filter(user => user.email !== email);
        localStorage.setItem(this.usersDbName, JSON.stringify(users));
        return true;
    }

    async registerUser(email, password) {
        let users = JSON.parse(localStorage.getItem(this.usersDbName) || '[]');
        if (users.find(user => user.email === email)) {
            return false; // User already exists
        }
        users.push({ email, password });
        localStorage.setItem(this.usersDbName, JSON.stringify(users));
        return true;
    }

    async authenticateUser(email, password) {
        let users = JSON.parse(localStorage.getItem(this.usersDbName) || '[]');
        return users.find(user => user.email === email && user.password === password);
    }
}


/**
 * CLASSE FACADE: IEsporteDBFacade
 *
 * Esta é a única classe que o Frontend (script.js) irá interagir.
 * Ela simplifica as chamadas complexas do DBHandler e fornece uma interface limpa.
 */
export class IEsporteDBFacade {
    constructor() {
        this.db = new DBHandler();
    }

    /**
     * OPERAÇÃO 1: Obter todos os exercícios para o catálogo.
     * @returns {Promise<Array<Object>>} Lista de exercícios.
     */
    async fetchAllExercises() {
        console.log("Facade: Buscando todos os exercícios.");
        try {
            return await this.db.getAllExercises();
        } catch (error) {
            console.error("Erro ao buscar exercícios:", error);
            return []; // Retorna array vazio em caso de falha
        }
    }

    /**
     * OPERAÇÃO 2: Obter um exercício específico para o modal de detalhes.
     * @param {number} id - ID do exercício.
     * @returns {Promise<Object|null>} O exercício ou null.
     */
    async getExerciseDetails(id) {
        console.log(`Facade: Buscando detalhes do exercício ID: ${id}.`);
        try {
            return await this.db.getExerciseById(id);
        } catch (error) {
            console.error(`Erro ao buscar exercício ${id}:`, error);
            return null;
        }
    }

    /**
     * OPERAÇÃO 3: Excluir a conta do usuário (simulação de operação sensível do DB).
     * @param {string} userEmail - Email do usuário a ser excluído.
     * @returns {Promise<boolean>} Status da exclusão.
     */
    async deleteUserAccount(userEmail) {
        console.log(`Facade: Iniciando exclusão de conta para ${userEmail}.`);
        try {
            // Em uma aplicação real, a lógica de auth e db estaria aqui
            const success = await this.db.deleteUserData(userEmail);
            if (success) {
                console.log(`Facade: Conta de ${userEmail} excluída com sucesso.`);
            }
            return success;
        } catch (error) {
            console.error("Erro no Facade ao excluir conta:", error);
            return false;
        }
    }

    /**
     * OPERAÇÃO 4: Registrar um novo usuário.
     * @param {string} email - Email do novo usuário.
     * @param {string} password - Senha do novo usuário.
     * @returns {Promise<boolean>} Status do registro.
     */
    async registerUser(email, password) {
        console.log(`Facade: Registrando novo usuário com email: ${email}.`);
        try {
            return await this.db.registerUser(email, password);
        } catch (error) {
            console.error("Erro no Facade ao registrar usuário:", error);
            return false;
        }
    }

    /**
     * OPERAÇÃO 5: Autenticar um usuário.
     * @param {string} email - Email do usuário.
     * @param {string} password - Senha do usuário.
     * @returns {Promise<Object|null>} O usuário ou null.
     */
    async authenticateUser(email, password) {
        console.log(`Facade: Autenticando usuário com email: ${email}.`);
        try {
            return await this.db.authenticateUser(email, password);
        } catch (error) {
            console.error("Erro no Facade ao autenticar usuário:", error);
            return null;
        }
    }
}
