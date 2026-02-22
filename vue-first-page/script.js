
// Implementazione di Vue

const { createApp, ref, watch, computed, reactive, onBeforeMount, onMounted } = Vue;

// Options API

// createApp({
//     data(){
//         return {
//             message: 'Hello Vue!'
//         }
//     },
//     methods: {
//         HandleChangeText(){
//             //alert("Hai Cliccato");
//             this.message = "Change Text: Vue is not Best!!"
//         }
//     }
// }).mount('#app');

// Composition API

createApp({
setup() {
  
  // Prima del Montaggio
  onBeforeMount(() => {
    console.info("Vue Inizializzato...");
  })

  // Montato
  onMounted(() => {
    setTimeout(() => {
      console.info("Vue Inizializzato :)");
    }, 1500)
  })

  const defaultMessage = "Start Vue :)";
  const imgDefault = [ "./vue-1.webp", "./vue-2.webp", "./vue-4.png"];
  const message = ref(defaultMessage);
  const imgs = ref(imgDefault[0]);
  const editMessage = ref(false);
  const TextFirstName = ref("");
  const TextLastName = ref("");
  const isShow = ref(false);

  const isPostsList = reactive([ 
    { id: 0, text: "Vue", title: "FrameWork: Vue" }, 
    { id: 1, text: "React", title: "FrameWork: React" }, 
    { id: 3, text: "Svelte", title: "FrameWork: Svelte" }, 
    { id: 4, text: "JS", title: "Tech-Languagge: Javascript" }, 
    { id: 5, text: "HTML", title: "Tech-Languagge: Hyper Text Markup Languagge" },
    { id: 6, text: "CSS", title: "Tech-Languagge: Cascading Style Sheets" }, 
    { id: 7, text: "Java", title: "Tech-Languagge: JAVA" },
    { id: 8, text: "Go", title: "Tech-Language: GO" } 
  ]);

  const HandleChangeTextA = () => {
    message.value = "Vue is not Best!!";
    imgs.value = imgDefault[1];
  }

  const HandleChangeTextB = () => {
    message.value = "Vue is Best!!";
    imgs.value = imgDefault[2];
  }

  const HandleResetText = () => {
    message.value = defaultMessage;
    editMessage.value = false;
    imgs.value = imgDefault[0];
  }

  const SetCardText = () => {
     isShow.value = true;
  };

  // FullName - Computed Function
  const cardUser = computed(() => {
    if (TextFirstName.value !== "") {
      return { first: TextFirstName.value, last: TextLastName.value }
    }
  });

  watch(message, (message, preMessage) => {
    console.log("State Message:", message);
    if(message !== ""){
        editMessage.value = true;
        setTimeout(() => { editMessage.value = false; }, 1600);
    }
  })

  return{
    message,
    HandleChangeTextA,
    HandleChangeTextB,
    editMessage,
    HandleResetText,
    imgs,
    TextFirstName,
    SetCardText,
    cardUser,
    isShow,
    TextLastName,
    isPostsList
  }

}}).mount('#app');