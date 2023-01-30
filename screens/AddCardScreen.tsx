import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import Button from "../components/Button";
import Input from "../components/Input";
import Form from "../components/Form";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Storage } from "expo-storage";
import validation from "../config/validations";

type FormData = {
  name: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  district: string;
  postalCode: string;
};

let data = {
  billingDetails: {
    name: 'Satoshi Nakamoto',
    city: 'Boston',
    country: 'US',
    line1: '100 Money Street',
    line2: 'Suite 1',
    district: 'MA',
    postalCode: '01234'
  },
  metadata: {
    email: 'satoshi@circle.com',
    phoneNumber: '+14155555555',
    sessionId: 'DE6FA86F60BB47B379307F851E238617',
    ipAddress: '244.28.239.130'
  },
  idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
  keyId: 'key1',
  encryptedData: 'LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo',
  expMonth: 1,
  expYear: 2020
}



const AddCard = ({ route, navigation }) => {
  const { total_cost } = route.params;
  const [cardData, setCardData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [next, setNext] = React.useState(false);
  
 

  const getKey = async () => {
    const item = JSON.parse(await Storage.getItem({ key: `pciKey` }));
    return item;
  };

  const onChange = (form: any) => setCardData(form);

  const saveCardInfo = async (cardData: any) => {
    const data = {
      number: cardData?.values?.number,
      cvv: cardData?.values?.cvc,
      pubkey: await getKey(),
    };
    // console.log(">>>", data);

    secureCardData(data);
  };

  const secureCardData = async (data: any) => {
    setLoading(!loading);
    try {
      await axios
        .post("https://kichain-server.onrender.com/card-secure", data)
        .then(function (res) {
          setLoading(!loading);
          setNext(!next);
          console.log("secureCard>", res.data);
        });
    } catch (error) {
      alert(error);
    }
  };

  const { handleSubmit, register, setValue, errors, getValues } =
    useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert("data");
  };

  // Storage.setItem({
  //   key: "billing",
  //   value: JSON.stringify(userInfo),
  // });

  return (
    <ScrollView style={styles.main}>
      {!next ? (
        <CreditCardInput onChange={onChange} autoFocus allowScroll />
      ) : (
        <View style={styles.container}>
          <Form {...{ register, setValue, validation, errors }}>
            <Input name="phone" label="Phone Number" keyboardType={"numeric"} />
            <Input name="password" label="Password" secureTextEntry={true} />

            <Button onPress={handleSubmit(onSubmit)} variant="" title="LOGIN" />
          </Form>
        </View>
      )}

      <View style={styles.button}>
        {cardData && !next ? (
          <Button
            onPress={() => saveCardInfo(cardData)}
            variant="outlined"
            title="Continue"
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
});

export default AddCard;
