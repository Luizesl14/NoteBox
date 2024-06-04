import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import logoImg from '../../../public/logo.svg';
import styles from '../../../styles/home.module.scss';
import { Button } from '../../components/layout/Button';
import { Input } from '../../components/layout/Input';
import { Select } from '../../components/layout/Select';

import { AuthContext } from '../../contexts/AuthContent';

function Step1({ nextStep, formData, setFormData }) {
  useEffect(() => {
    const cpfMask = (value) => {
      return value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{3})(\d)/, '$1.$2') // Add first dot
        .replace(/(\d{3})(\d)/, '$1.$2') // Add second dot
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Add dash
    };

    const cpfInput = document.getElementById('cpf') as HTMLInputElement;
    if (cpfInput) {
      cpfInput.value = cpfMask(formData.persona.cpf);
    }

    const handleCpfChange = (event) => {
      const { value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        persona: {
          ...prevData.persona,
          cpf: cpfMask(value),
        },
      }));
    };

    cpfInput?.addEventListener('input', handleCpfChange);

    return () => {
      cpfInput?.removeEventListener('input', handleCpfChange);
    };
  }, [formData.persona.cpf, setFormData]);

  return (
    <>
      <Input
        type="text"
        placeholder="Enter your Name"
        value={formData.persona.name}
        onChange={(e) =>
          setFormData({ ...formData, persona: { ...formData.persona, name: e.target.value } })
        }
      />

      <Select
        id="gender-type"
        name="gender-type"
        value={formData.persona.gender}
        onChange={(e) =>
          setFormData({ ...formData, persona: { ...formData.persona, gender: e.target.value } })
        }
      >
        <option value="">Select gender...</option>
        <option value="F">FEMALE</option>
        <option value="M">MALE</option>
        <option value="O">OTHERS</option>
      </Select>

      <Input
        type="text"
        placeholder="Enter your RG"
        value={formData.persona.rg}
        onChange={(e) =>
          setFormData({ ...formData, persona: { ...formData.persona, rg: e.target.value } })
        }
      />

      <Input
        type="text"
        placeholder="Enter your CPF"
        id="cpf"
        value={formData.persona.cpf}
        onChange={(e) =>
          setFormData({ ...formData, persona: { ...formData.persona, cpf: e.target.value } })
        }
      />

      <Button onClick={nextStep}>Next</Button>
    </>
  );
}

function Step2({ nextStep, prevStep, formData, setFormData }) {
  useEffect(() => {
    const cnpjMask = (value) => {
      return value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{2})(\d)/, '$1.$2') // Add first dot
        .replace(/(\d{3})(\d)/, '$1.$2') // Add second dot
        .replace(/(\d{3})(\d)/, '$1/$2') // Add slash
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2'); // Add dash
    };

    const cnpjInput = document.getElementById('cnpj') as HTMLInputElement;
    if (cnpjInput) {
      cnpjInput.value = cnpjMask(formData.company.cnpj);
    }

    const handleCnpjChange = (event) => {
      const { value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        company: {
          ...prevData.company,
          cnpj: cnpjMask(value),
        },
      }));
    };

    cnpjInput?.addEventListener('input', handleCnpjChange);

    return () => {
      cnpjInput?.removeEventListener('input', handleCnpjChange);
    };
  }, [formData.company.cnpj, setFormData]);

  return (
    <>
      <Input
        type="text"
        placeholder="Enter your Company Name"
        value={formData.company.name}
        onChange={(e) =>
          setFormData({ ...formData, company: { ...formData.company, name: e.target.value } })
        }
      />
      <Input
        type="text"
        placeholder="Enter your CNPJ"
        id="cnpj"
        value={formData.company.cnpj}
        onChange={(e) =>
          setFormData({ ...formData, company: { ...formData.company, cnpj: e.target.value } })
        }
      />
      <Input
        type="text"
        placeholder="Enter your Website"
        value={formData.company.website}
        onChange={(e) =>
          setFormData({ ...formData, company: { ...formData.company, website: e.target.value } })
        }
      />

      <Select
        id="company-type"
        name="company-type"
        value={formData.company.type}
        onChange={(e) =>
          setFormData({ ...formData, company: { ...formData.company, type: e.target.value } })
        }
      >
        <option value="">Select Company type...</option>
        <option value="MEI">MEI</option>
        <option value="LTDA">LTDA</option>
        <option value="EIRELI">EIRELI</option>
      </Select>

      <Input
        type="text"
        placeholder="Enter your State Registration"
        value={formData.company.state_registration}
        onChange={(e) =>
          setFormData({
            ...formData,
            company: { ...formData.company, state_registration: e.target.value },
          })
        }
      />
      <Input
        type="text"
        placeholder="Enter your Municipal Registration"
        value={formData.company.municipal_registration}
        onChange={(e) =>
          setFormData({
            ...formData,
            company: { ...formData.company, municipal_registration: e.target.value },
          })
        }
      />
      <Select
        id="sector-type"
        name="sector-type"
        value={formData.company.activity_sector}
        onChange={(e) =>
          setFormData({ ...formData, company: { ...formData.company, activity_sector: e.target.value } })
        }
      >
        <option value="">Select activity sector...</option>
        <option value="PADARIA">PADARIA</option>
        <option value="FASTFOOD">FASTFOOD</option>
        <option value="RESTAURANTE">RESTAURANTE</option>
      </Select>
      <Button onClick={prevStep}>Previous</Button>
      <Button onClick={nextStep}>Next</Button>
    </>
  );
}

function Step3({ prevStep, formData, setFormData, handleSubmit, loading }) {
  useEffect(() => {
    const phoneMask = (value) => {
      if (!value) return '';
      return value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{2})(\d)/, '($1) $2') // Add parentheses and space
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2'); // Add dash
    };

    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    if (phoneInput) {
      phoneInput.value = phoneMask(formData.data.phone);
    }

    const handlePhoneChange = (event) => {
      const { value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        data: {
          ...prevData.data,
          phone: phoneMask(value),
        },
      }));
    };

    phoneInput?.addEventListener('input', handlePhoneChange);

    return () => {
      phoneInput?.removeEventListener('input', handlePhoneChange);
    };
  }, [formData.data.phone, setFormData]);

  useEffect(() => {
    const postalCodeMask = (value) => {
      return value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{5})(\d{1,3})$/, '$1-$2'); // Add dash after the fifth digit
    };

    const postalCodeInput = document.getElementById('postalCode') as HTMLInputElement;
    if (postalCodeInput) {
      postalCodeInput.value = postalCodeMask(formData.data.cep);
    }

    const handlePostalCodeChange = (event) => {
      const { value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        data: {
          ...prevData.data,
          cep: postalCodeMask(value),
        },
      }));
    };

    postalCodeInput?.addEventListener('input', handlePostalCodeChange);

    return () => {
      postalCodeInput?.removeEventListener('input', handlePostalCodeChange);
    };
  }, [formData.data.cep, setFormData]);

  return (
    <>
      <Input
        type="text"
        placeholder="Enter your Phone Number"
        id="phone"
        value={formData.data.phone}
        onChange={(e) =>
          setFormData({ ...formData, data: { ...formData.data, phone: e.target.value } })
        }
      />
      <Input
        type="text"
        placeholder="Enter your Postal Code"
        id="postalCode"
        value={formData.data.cep}
        onChange={(e) =>
          setFormData({ ...formData, data: { ...formData.data, cep: e.target.value } })
        }
      />
      <Input
        type="text"
        placeholder="Enter your Address Number"
        value={formData.data.address_number}
        onChange={(e) =>
          setFormData({ ...formData, data: { ...formData.data, address_number: e.target.value } })
        }
      />
      <Input
        type="text"
        placeholder="Enter your Complement"
        value={formData.data.complement}
        onChange={(e) =>
          setFormData({ ...formData, data: { ...formData.data, complement: e.target.value } })
        }
      />
      <Input
        type="text"
        placeholder="Enter your Email"
        value={formData.user.email}
        onChange={(e) =>
          setFormData({ ...formData, user: { ...formData.user, email: e.target.value } })
        }
      />
      <Input
        type="password"
        placeholder="Enter your Password"
        value={formData.user.password}
        onChange={(e) =>
          setFormData({ ...formData, user: { ...formData.user, password: e.target.value } })
        }
      />
      <Button onClick={prevStep}>Previous</Button>
      <Button type="submit" loading={loading}>
        Register
      </Button>
    </>
  );
}

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    persona: {
      name: '',
      gender: '',
      rg: '',
      cpf: '',
    },
    company: {
      name: '',
      cnpj: '',
      website: '',
      type: '',
      state_registration: '',
      municipal_registration: '',
      activity_sector: '',
    },
    data: {
      phone: '',
      cep: '',
      address_number: '',
      complement: '',
    },
    user: {
      email: '',
      password: '',
      role: 'CLTD',
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validations for each step
    if (step === 1) {
      const { name, cpf, gender } = formData.persona;
      if (!name || !cpf || !gender) {
        alert('Please fill out all required fields in the first step.');
        return;
      }
    }

    if (step === 2) {
      const { name, cnpj, type } = formData.company;
      if (!name || !cnpj || !type) {
        alert('Please fill out all required fields in the second step.');
        return;
      }
    }

    if (step === 3) {
      const { phone, cep, address_number } = formData.data;
      const { email, password } = formData.user;
      if (!phone || !cep || !address_number || !email || !password) {
        alert('Please fill out all required fields in the third step.');
        return;
      }
    }

    setLoading(true);
    console.log(formData);
    await signUp(formData);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Faça seu Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="NoteBox" priority />
        <div className={styles.login}>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Step1
                nextStep={nextStep}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 2 && (
              <Step2
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 3 && (
              <Step3
                prevStep={prevStep}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </form>
          <Link href="/">
            <span className={styles.text}>Have an account? Sign In</span>
          </Link>
        </div>
      </div>
    </>
  );
}
