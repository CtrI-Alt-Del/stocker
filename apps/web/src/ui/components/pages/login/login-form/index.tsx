"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { Controller } from "react-hook-form";

import { useLoginForm } from "./use-login-form";
import { PasswordInput } from "@/ui/components/commons/password-input";
import { ROUTES } from "@/constants";

export const LoginForm = () => {
  const { errors, formControl, isSubmitting, handleSubmit, registerField } =
    useLoginForm();

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-5">
      <h1 className="w-full text-3xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-80">
        <Input
          label="Email"
          placeholder="Digite seu email"
          labelPlacement="outside"
          size="md"
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          {...registerField("email")}
        />

        <Controller
          name="password"
          control={formControl}
          render={({ field: { value, onChange } }) => (
            <PasswordInput
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
              labelPlacement="outside"
              size="md"
              isInvalid={Boolean(errors.password)}
              errorMessage={errors.password?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <p className="pb-4 text-sm justify-items-end">
          Esqueceu sua senha?{" "}
          <Link href={ROUTES.requestPasswordReset} className="font-semibold">
            Clique aqui!
          </Link>
        </p>
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <Button
            color="primary"
            type="submit"
            size="md"
            isLoading={isSubmitting}
            className="w-full font-semibold text-orange"
          >
            <p className="text-white">Entrar</p>
          </Button>
          <p className="text-sm">
            Não possui uma conta?{" "}
            <Link href={ROUTES.subscribe} className="font-semibold">
              Cadastre-se agora!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
